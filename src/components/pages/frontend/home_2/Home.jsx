import { imgPath } from '@/components/helpers/functions-general';
import React from 'react';

const Home = () => {
    
  return (
    <div className='bg-gray-200'>
        {/* Hero Section */}
        <section className='relative w-full h-[300px] flex flex-col items-center justify-center text-center px-2'>
          <div className='layer absolute'>
            <img src={`${imgPath}/Layer.png`} alt="" className='w-full '/>
          </div>
            <h1 className='text-4xl font-semibold text-black relative border bg-white'>
                Fresh & Organic Vegetables <br/>
               Bringing Local Farmers Right to your Table
            </h1>
            <button className='mt-4 bg-white text-green-600 px-6 rounded-full font-semibold shadow-md hover:bg-gray-200'>
                 Check Now
            </button>
        </section>

        {/* Featured Products */}
        <section className='py-12 bg-white'>
          <div className='container'>
            <div className='wrapper'>
              <h2 className='text-3xl font-semibold text-center mb-8'>
                Featured Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
                <div className='bg-gray-200 p-4 rounded-lg shadow-md hover:scale-105 transition'>
                  <img src={`${imgPath}/Apples.jpg`} alt="" className='w-full h-40 object-cover rounded-md'/>
                  <h3 className='mt-2 font-semibold'>
                      Organic Apples
                  </h3>
                  <p className='text-green-600 font-bold'>
                      $5.99 / kg
                  </p>
                  <button className='mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700'>
                        Add to Cart
                  </button>
              </div>
              <div className='bg-gray-200 p-4 rounded-lg shadow-md hover:scale-105 transition'>
                <img src={`${imgPath}/Veg.jpg`} alt="" className='w-full h-40 object-cover rounded-md'/>
                  <h3 className='mt-2 font-semibold'>
                      Fresh Vegetables
                  </h3>
                  <p className='text-green-600 font-bold'>
                      $20 / kg
                  </p>
                  <button className='mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700'>
                        Add to Cart
                  </button>
              </div>
              <div className='bg-gray-200 p-4 rounded-lg shadow-md hover:scale-105 transition'>
                <img src={`${imgPath}/Grains.jpg`} alt="" className='w-full h-40 object-cover rounded-md'/>
                  <h3 className='mt-2 font-semibold'>
                     Grains
                  </h3>
                  <p className='text-green-600 font-bold'>
                      $5.99 / kg
                  </p>
                  <button className='mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700'>
                        Add to Cart
                  </button>
              </div>
              <div className='bg-gray-200 p-4 rounded-lg shadow-md hover:scale-105 transition'>
                <img src={`${imgPath}/Dairy.jpg`} alt="" className='w-full h-40 object-cover rounded-md'/>
                  <h3 className='mt-2 font-semibold'>
                      Freshly Dairy
                  </h3>
                  <p className='text-green-600 font-bold'>
                      $5.99 / kg
                  </p>
                  <button className='mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700'>
                        Add to Cart
                  </button>
                </div>
              </div>
            </div>

              {/* <div className="div mt-20">
                <img className="w-full bg-cover opacity-75" src={`${imgPath}/kinds.png`} alt="" />
              </div> */}
          </div>
        </section>
    </div>
  )
}

export default Home;
