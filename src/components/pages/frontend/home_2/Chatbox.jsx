import React, { useEffect, useState } from 'react'
import io from "socket.io-client";

const Chatbox = () => {
    const socket = io("http://localhost:5173/"); // Adjust based on your backend
  
    const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("User1"); // Example user, replace with auth user
  const [isHovered, setIsHovered] = useState(false);
  
    useEffect(() => {
      fetch("/api/messages")
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((err) => console.error("Error fetching messages:", err));
  
      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
  
      return () => socket.off("receiveMessage");
    }, []);
  
    const sendMessage = async () => {
      if (!input.trim()) return;
      const newMessage = { sender: user, text: input };
      setMessages([...messages, newMessage]);
      setInput("");
  
      socket.emit("sendMessage", newMessage);
  
      try {
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage),
        });
  
        if (response.ok) {
          const aiResponse = await fetchAIResponse(input);
          setMessages((prevMessages) => [...prevMessages, aiResponse]);
          socket.emit("sendMessage", aiResponse);
        }
      } catch (err) {
        console.error("Error sending message:", err);
      }
    };
  
    const fetchAIResponse = async (message) => {
      try {
        const response = await fetch("/api/ai-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
        return await response.json();
      } catch (err) {
        console.error("Error fetching AI response:", err);
        return { sender: "AI", text: "I'm having trouble responding right now." };
      }
    };
  

    return (
      <div
        className={`fixed bottom-4 right-4 w-80 bg-blue-300 border shadow-lg rounded-lg p-4 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="text-2xl font-bold text-black">Chatbox</h2>
        <div className="h-48 overflow-y-auto border p-2 mt-2">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 my-1 rounded ${msg.sender === user ? "bg-blue-200 text-right" : msg.sender === "AI" ? "bg-yellow-200" : "bg-gray-200"}`}>
              <strong>{msg.sender}: </strong>{msg.text}
            </div>
          ))}
        </div>
        <div className="mt-2 flex">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700">
            Send
          </button>
        </div>
      </div>
    );
  }
  


export default Chatbox
