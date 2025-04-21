import React from 'react'

const LandingPage = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <img className="w-full h-[600px] bg-cover bg-center object-cover absolute mt-2" src="/img/banner-demo.jpg" />
        <header className="text-center relative z-10">
          <h1 className="text-[50px] font-bold text-white">Welcome to Seedling</h1>
          <p className="mt-4 text-[30px] text-white font-poppins">Connecting farmers and markets for a sustainable future.</p>
        </header>
    </div>
    
  )
}

export default LandingPage
