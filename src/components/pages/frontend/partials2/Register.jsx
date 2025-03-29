import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Register = () => {
    const [name, setName] = useState("");
            const [email, setEmail] = useState("");
            const [password, setPassword] = useState("");
          
            const handleRegister = (e) => {
              e.preventDefault();
              console.log("Registering with", name, email, password);
            };

   return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-600 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700">Join World Peas</h2>
        <form className="mt-4" onSubmit={handleRegister}>
          <input type="text" placeholder="Name" className="w-full p-2 border rounded mb-4" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Sign Up</button>
        </form>
        <p className="mt-4 text-center text-gray-600">Already have an account? 
          <Link to="/login" className="text-green-600">Login</Link></p>
      </div>
    </div>
  );
}

export default Register
