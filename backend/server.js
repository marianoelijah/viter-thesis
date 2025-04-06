import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';  // Corrected bcrypt import

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "worldpeas_v2",
});

// Salt rounds for bcrypt
const saltRounds = 10;

// Registration route
app.post("/register", (req, res) => {
    console.log("Register route was hit!");
    console.log("Request Body:", req.body);  // Log the body of the request

    // Hash the password using bcrypt
    bcrypt.hash(req.body.password.toString(), saltRounds, (err, hashedPassword) => {
        if (err) return res.json({ Error: "Error hashing password" });

        // Prepare SQL query to insert new user
        const sql = "INSERT INTO users (username, email, password) VALUES (?)";
        const values = [req.body.username, req.body.email, hashedPassword];

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ Error: "Error inserting user into database" });
            }
            console.log("User registered:", req.body);  // Log the registration data
            return res.json({ Status: "User registered successfully", result });
        });
    });
});

// app.post("/register", (req, res) => {
//     // Hash the password using bcrypt
//     bcrypt.hash(req.body.password.toString(), saltRounds, (err, hashedPassword) => {
//         if (err) return res.json({ Error: "Error hashing password" });

//         // Prepare SQL query to insert new user
//         const sql = "INSERT INTO users (username, email, password) VALUES (?)";
//         const values = [req.body.username, req.body.email, hashedPassword];

//         db.query(sql, [values], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return res.json({ Error: "Error inserting user into database" });
//             }
//             return res.json({ Status: "User registered successfully", result });
//         });
//     });
// });

// Login route
app.post("/login", (req, res) => {
    console.log("Email received:", req.body.email); // Log the email
    console.log("Password received:", req.body.password); // Log the password

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            console.error("Database query error:", err); // Log any database error
            return res.json({ Error: "Error querying the database" });
        }

        if (result.length > 0) {
            console.log("User found:", result[0]); // Log the user from the DB

            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) {
                    console.error("Error comparing passwords:", err); // Log error in password comparison
                    return res.json({ Error: "Error comparing password" });
                }

                if (response) {
                    console.log("Login successful for:", req.body.email); // Log successful login
                    return res.json({ Status: "Login successful" });
                } else {
                    console.log("Wrong password for:", req.body.email); // Log wrong password
                    return res.json({ Error: "Wrong password" });
                }
            });
        } else {
            console.log("No user found with email:", req.body.email); // Log if no user found
            return res.json({ Error: "Email does not exist" });
        }
    });
});



// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
