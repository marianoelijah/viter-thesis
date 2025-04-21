import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm the Worldpeas Bot. Ask me anything about Worldpeas 🌱" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle message sending
  const handleSend = async () => {
    if (!input.trim()) return; // Don't send empty messages

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]); // Update chat history with user's message
    setInput(""); // Clear the input field
    setLoading(true); // Set loading state to true

    try {
      // Send POST request to the backend API
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({ message: input }), // Send user's message in the body
      });

      // Parse the response from the backend
      const data = await res.json();

      // Add bot's response to the chat history
      const botReply = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Chatbot error:", error);
      // Handle error if the POST request fails
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong. Please try again later." },
      ]);
    } finally {
      setLoading(false); // Set loading to false after response is received
    }
  };

  // Handle the Enter key press to send the message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend(); // Send the message on Enter key press
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-2xl border border-green-200 flex flex-col overflow-hidden z-50">
      <div className="bg-green-600 text-white p-3 font-semibold">🌱 Worldpeas Chatbot</div>
      <div className="p-3 h-64 overflow-y-auto space-y-2 bg-green-50 text-sm">
        {/* Map through the messages and display each one */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-xl max-w-[80%] ${
              msg.sender === "bot"
                ? "bg-green-100 text-left"
                : "bg-green-300 text-right self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {/* Display loading state */}
        {loading && (
          <div className="text-green-500 italic text-xs">Bot is typing...</div>
        )}
      </div>
      <div className="flex border-t p-2 gap-2 bg-white">
        {/* Input field for user to type their message */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state
          onKeyDown={handleKeyPress} // Send message on Enter key press
          className="flex-1 p-2 border rounded-md text-sm"
          placeholder="Ask something..."
        />
        {/* Send button */}
        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
