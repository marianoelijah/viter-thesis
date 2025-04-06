import bcrypt from 'bcrypt';

const password = "iwu2l&stv"; // The original password
const saltRounds = 10;

console.log("Hashing password...");
bcrypt.hash(password, saltRounds).then(hash => {
    console.log("Hashed Password:", hash);

    // Hashing password...
    // Hashed Password: $2b$10$6uCTibGyOx9/1G8OlcHQZOvqtK23oVeWyZIBw1iBiyBRa/z1T2V0G

    // Simulating login: Comparing entered password with stored hash
    bcrypt.compare(password, hash).then(result => {
        if (result) {
            console.log("✅ Password is correct!");
        } else {
            console.log("❌ Password is incorrect!");
        }
    }).catch(err => console.error(err));

}).catch(err => console.error(err));
