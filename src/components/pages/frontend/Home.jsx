import React from 'react'

const Home = () => {
  return (
    <div className='bg-gray-100'>
        {/* Hero Section */}
        <section className='relative w-full h-[300px] bg-green-600 text-white flex flex-col items-center justify-center text-center px-6'>
            <h1 className='text-4xl font-bold'>
                Fresh & Organic Farmers Market
            </h1>
            <p className='mt-2 text-lg'>
                Directly From farm to your table
            </p>
            <button className='mt-4 bg-white text-green-600 px-6 rounded-full font-semibold shadow-md hover:bg-gray-200'>
                 Check Now
            </button>
        </section>

         {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Find fresh produce..."
          className="border border-gray-300 py-2 mb-5 rounded-l-md focus:outline-none w-1/2"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700">
          Search
        </button>
      </div>
      
        {/* Categories Section */}
        <section className='py-12 mx-auto bg-green-600'>
            <h2 className='text-center mb-8 text-4xl font-bold'>
                Category
            </h2>
            <div className='flex flex-wrap justify-center gap-6'>
                {["Vegetables", "Fruits", "Dairy", "Grains",].map((category) => 
                (
                   <div key={category} 
                   className='w-36 h-36 bg-white shadow-md rounded-lg flex flex-col items-center justify-center hover:scale-105 transition'>
                    <img src={`/${category.toLowerCase()}.png`} alt="" className='w-16 h-16'/>
                    <p className='mt-2 font-semibold'>
                        {category}
                    </p>
                   </div>
                ))}
            </div>
        </section>

        {/* Featured Products */}
        {/* <section className='py-12 bg-white'>
            <h2 className='text-3xl font-semibold text-center mb-8'>
                Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item}
                    className='bg-gray-200 p-4 rounded-lg shadow-md'>
                    <img src={"/product$ {item}.jpg"} alt="Product" className='w-full h-40 object-cover rounded-md'/>
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
                ))}
            </div>
        </section> */}

         {/* Testimonials */}
         {/* <section className='py-12'>
            <h2 className='text-3xl font-semibold text-center mb-8'>
                What our Costumer/Farmers Say?
            </h2>
            <div className='flex flex-col item-center'>
                <p className='max-w-lg  text-center text-gray-700 italic'>
                    "The freshest organic produce delivered right to my door! Highly recommend this market".
                </p>
                <p className='mt-2 font-semibold'>
                    -Alex Santos
                </p>
            </div>
         </section> */}

    </div>
  )
}

export default Home;
