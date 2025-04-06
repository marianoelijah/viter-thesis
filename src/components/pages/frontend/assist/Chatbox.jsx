import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

// const socket = io("http://localhost:3001");

const Chatbox = ({ currentUser, selectedUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    // Fetch messages from MySQL
    // axios.get("http://localhost:3001/messages").then((res) => {
    //   setMessages(res.data);
    // });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "" && selectedUser) {
      const newMessage = { sender: currentUser, receiver: selectedUser, message };
      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        {isOpen ? "Close Chat" : "Chat"}
      </button>

      {isOpen && (
        <div ref={chatRef} className="mt-2 w-80 bg-white shadow-lg rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-2">Chat with {selectedUser}</h2>
          <div className="h-60 overflow-y-auto border p-2">
            {messages
              .filter((msg) => (msg.sender === currentUser && msg.receiver === selectedUser) || (msg.sender === selectedUser && msg.receiver === currentUser))
              .map((msg, index) => (
                <p key={index} className="mb-1">
                  <strong>{msg.sender}:</strong> {msg.message}
                </p>
              ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;