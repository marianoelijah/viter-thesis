import { imgPath } from "@/components/helpers/functions-general";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
   const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();
  
  const products = [
    { id: 1, 
      name: "Mango", 
      price: 50, 
      category: "Fruits", 
      image: "mango.jpg" },
    { id: 2, 
      name: "Fresh Carrots", 
      price: 45, 
      category: 
      "Vegetables", 
      image: "carrots.jpg" },
    { id: 3, 
      name: "Dairy Milk", 
      price: 35, 
      category: "Dairy", 
      image: "Dairy.jpg" },
    { id: 4, 
      name: "Grains", 
      price: 65, 
      category: "Grains", 
      image: "Grains.jpg" },
  ];

  const categories = ["All", "Fruits", "Vegetables", "Dairy", "Grains"];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on search and category
  const filteredProducts = products.filter(
    (products) =>
      products.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || products.category === selectedCategory)
  );
  const handleAction = (action) => {
    setConfirmation(`Are you sure you want to ${action} this product?`);
  };
  const confirmAction = () => {
    alert("Transaction confirmed!");
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-semibold text-center mb-6">Categories</h1>

      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-md shadow-md mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 p-2 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="mt-3 sm:mt-0 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((products) => (
            <div key={products.id} className="bg-gray-300 p-4 rounded-md shadow-md hover:scale-105 transition">
              <img src={`${imgPath}/mango.jpg`} alt="" className="w-full h-40 object-cover rounded-md" />
              <h3 className="mt-2 font-semibold">{products.name}</h3>
              <p className="text-green-600 font-bold">P{products.price.toFixed(2)}</p>
              <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">This product is not available.</p>
        )}
      </div> */}

        {/* Product Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
                <div className='bg-gray-200 p-4 rounded-lg shadow-md hover:scale-105 transition'>
                  <img src={`${imgPath}/mango.jpg`} alt="" className='w-full h-40 object-cover rounded-md'/>
                  <h3 className='mt-2 font-semibold'>
                  Mango
                  </h3>
                  <p className='text-green-600 font-bold'>
                  P45 per kg
                  </p>
                  <button onClick={() => handleAction("Add to Cart")} className='mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-300 hover:text-black'>
                      Add to Cart
                  </button>
              </div>
              {confirmation && (
              <div className="mt-4 p-4 border border-gray-300 rounded">
                <p>{confirmation}</p>
                <button onClick={confirmAction} className="mt-2 bg-red-600 text-white px-4 py-2 rounded">Confirm</button>
              </div>
            )}
             <div className='bg-gray-200 p-4 rounded-lg shadow-md hover:scale-105 transition'>
                <img src={`${imgPath}/carrots.jpg`} alt="" className='w-full h-40 object-cover rounded-md'/>
                  <h3 className='mt-2 font-semibold'>
                      Fresh Carrots
                  </h3>
                  <p className='text-green-600 font-bold'>
                      P55 per kg
                  </p>
                  <button onClick={() => handleAction("Add to Cart")} className='mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-300 hover:text-black'>
                        Add to Cart
                  </button>
              </div>
              {confirmation && (
              <div className="mt-4 p-4 border border-gray-300 rounded">
                <p>{confirmation}</p>
                <button onClick={confirmAction} className="mt-2 bg-red-600 text-white px-4 py-2 rounded">Confirm</button>
              </div>
            )}
              <div className='bg-gray-200 p-4 rounded-lg shadow-md hover:scale-105 transition'>
                <img src={`${imgPath}/Dairy.jpg`} alt="" className='w-full h-40 object-cover rounded-md'/>
                  <h3 className='mt-2 font-semibold'>
                     Dairy Milk
                  </h3>
                  <p className='text-green-600 font-bold'>
                      P69 per kg
                  </p>
                  <button onClick={() => handleAction("Add to Cart")} className='mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-300 hover:text-black'>
                        Add to Cart
                  </button>
              </div>
              {confirmation && (
              <div className="mt-4 p-4 border border-gray-300 rounded">
                <p>{confirmation}</p>
                <button onClick={confirmAction} className="mt-2 bg-red-600 text-white px-4 py-2 rounded">Confirm</button>
              </div>
            )}
              <div className='bg-gray-200 p-4 rounded-lg shadow-md hover:scale-105 transition'>
                <img src={`${imgPath}/Grains.jpg`} alt="" className='w-full h-40 object-cover rounded-md'/>
                  <h3 className='mt-2 font-semibold'>
                      Grains
                  </h3>
                  <p className='text-green-600 font-bold'>
                     P50 per kg
                  </p>
                <button onClick={() => handleAction("Add to Cart")}  className='mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-300 hover:text-black'>
                        Add to Cart
                </button>
              </div>
              {confirmation && (
              <div className="mt-4 p-4 border border-gray-300 rounded">
                <p>{confirmation}</p>
                <button onClick={confirmAction} className="mt-2 bg-red-600 text-white px-4 py-2 rounded">Confirm</button>
              </div>
            )}
          </div>
        </div>
              )
            }            

      {/* Pagination Placeholder (Can be enhanced with state management) */}
      // <div className="mt-8 flex justify-center">
      //   <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Previous</button>
      //   <button className="bg-green-500 text-white px-4 py-2 rounded-md">Next</button>
      // </div>


export default Products;

