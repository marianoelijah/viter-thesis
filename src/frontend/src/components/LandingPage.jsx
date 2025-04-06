import React from 'react'

const LandingPage = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
        <header className="text-center">
          <h1 className="text-5xl font-bold text-green-700">Welcome to World Peas</h1>
          <p className="mt-4 text-lg text-black">Connecting farmers and markets for a sustainable future.</p>
        </header>

      <div className="p-10 text-center">
        <h3 className="text-3xl font-bold">Why Choose Us?</h3>
          <p className="mt-4 text-xl">
          "World Peas has completely transformed the way I connect with local farmers and markets. 
          As a small-scale grower, I used to struggle with selling my surplus produce and finding trusted trade 
          partners. This platform made everything so seamless! The ability to buy, sell, and even donate 
          excess food has not only helped my business but also strengthened my community. 
          I highly recommend World Peas to anyone looking for a smarter, more sustainable way to trade 
          agricultural goods!"
         </p>
         <div className="mt-6">
        
      </div>
      </div>
    </div>
  )
}

export default LandingPage
