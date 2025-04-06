import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginRegister() {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', registerData);
      navigate('/home');
    } catch (err) {
      console.error('Register Error:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', loginData);
      if (res.data.Status === 'Login successful') {
        navigate('/home');
      } else {
        alert(res.data.Error);
      }
    } catch (err) {
      console.error('Login Error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F4EC] font-poppins transition-all duration-700">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden flex">
        {/* Left side form */}
        <div className={`w-1/2 p-10 flex flex-col justify-center transition-all duration-500 ease-in-out transform ${isRegistering ? "-translate-x-full opacity-0 absolute pointer-events-none" : "opacity-100 relative"}`}>
          <h2 className="text-3xl font-bold text-[#2F5233] mb-6">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-green-50 focus:outline-none"
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-green-50 focus:outline-none"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <div className="flex justify-between text-sm text-gray-600">
              <label>
                <input type="checkbox" className="mr-1" />
                Remember me
              </label>
              <a href="#" className="text-green-800 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#6BBF59] hover:bg-green-600 text-white py-2 rounded font-semibold uppercase transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right side form */}
        <div className={`w-1/2 p-10 flex flex-col justify-center transition-all duration-500 ease-in-out transform ${isRegistering ? "opacity-100 relative" : "translate-x-full opacity-0 absolute pointer-events-none"}`}>
          <h2 className="text-3xl font-bold text-[#2F5233] mb-6">Create Account</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 rounded bg-green-50 focus:outline-none"
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-green-50 focus:outline-none"
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-green-50 focus:outline-none"
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <button
              type="submit"
              className="w-full bg-[#6BBF59] hover:bg-green-600 text-white py-2 rounded font-semibold uppercase transition"
            >
              Register
            </button>
          </form>
        </div>

        {/* Side switch panel */}
        <div className="w-1/2 bg-[#6BBF59] text-white flex flex-col justify-center items-center p-10 transition-all duration-500 ease-in-out">
          {isRegistering ? (
            <>
              <h2 className="text-2xl font-bold mb-2">Hello Again 👋</h2>
              <p className="text-center text-lg mb-4">We’re happy to see you back.</p>
              <button
                onClick={() => setIsRegistering(false)}
                className="bg-white text-green-700 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">Welcome to Worldpeas 🌱</h2>
              <p className="text-center text-lg mb-4">Join our sustainable platform today!</p>
              <button
                onClick={() => setIsRegistering(true)}
                className="bg-white text-green-700 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
