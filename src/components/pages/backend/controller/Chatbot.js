const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2/promise");
const axios = require("axios"); // For AI integration

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());

// ✅ Connect to MySQL
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "worldpeas_v2",
});

// ✅ Handle messages
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async (msg) => {
        const { sender_id, receiver_id, text } = msg;
        
        // Store message in MySQL
        const query = "INSERT INTO messages (sender_id, receiver_id, text, is_ai_response) VALUES (?, ?, ?, ?)";
        await db.execute(query, [sender_id, receiver_id, text, false]);

        // Broadcast to receiver
        io.emit("receiveMessage", msg);

        // If the receiver is AI, generate a response
        if (receiver_id === "AI") {
            const aiReply = await getAIResponse(text);
            const aiMessage = {
                sender_id: "AI",
                receiver_id: sender_id,
                text: aiReply,
                timestamp: new Date(),
            };

            // Store AI response in MySQL
            await db.execute(query, ["AI", sender_id, aiReply, true]);

            // Send AI response back
            io.emit("receiveMessage", aiMessage);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// ✅ AI Response Function (OpenAI API Example)
async function getAIResponse(userMessage) {
    try {
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        }, {
            headers: {
                "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
                "Content-Type": "application/json"
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("AI Error:", error);
        return "Sorry, I couldn't understand that.";
    }
}

server.listen(5500, () => {
    console.log("Server running on port 5500");
});
