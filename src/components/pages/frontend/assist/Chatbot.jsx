import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! Ask me anything about Worldpeas 🌱" },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Oops! Something went wrong.' }]);
    }

    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition duration-200"
      >
        💬
      </motion.button>

      {/* Chatbot Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-80 h-[28rem] p-4 mt-4 rounded-2xl shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-lg text-green-700">Worldpeas Assistant</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">✖️</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-sm p-2 rounded-lg max-w-[75%] ${
                    msg.sender === 'user'
                      ? 'bg-green-100 self-end'
                      : 'bg-gray-100 self-start'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="self-start bg-gray-200 text-sm p-2 rounded-lg max-w-[75%] flex gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.span
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  />
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="mt-3 flex">
              <input
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-1 text-sm focus:outline-none"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="bg-green-600 text-white px-3 py-1 rounded-r-lg text-sm hover:bg-green-700"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chatbot
