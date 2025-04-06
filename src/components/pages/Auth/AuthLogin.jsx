import React from 'react';

const AuthLogin = () => {
  return (
    <div className="flex justify-center items-center bg-primary min-h-screen">
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        <form action="">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-[#82257b]">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="form-control bg-light p-3 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-[#82257b]">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="form-control bg-light p-3 border border-gray-300 rounded-md w-full"
            />
          </div>
          <button className="btn bg-[#82257b] text-white w-full p-3 rounded-md uppercase font-semibold hover:bg-[#6a1a69]">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthLogin;
