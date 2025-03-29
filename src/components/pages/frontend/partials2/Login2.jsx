import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login2 = () => {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
      
        const handleLogin = (e) => {
          e.preventDefault();
          console.log("Logging in with", email, password);
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-black p-6">
              <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-700">Login to World Peas</h2>
                <form className="mt-4" onSubmit={handleLogin}>
                  <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
                </form>
                <p className="mt-4 text-center text-gray-600">Don't have an account? 
                  <Link to="/register" className="text-green-600">Sign Up</Link></p>
              </div>
            </div>
          );
        }  

export default Login2
