import { imgPath } from '@/components/helpers/functions-general';
import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Okra', price: 'P75 per kg', image: 'okra.jpg', description: 'Fresh organic okra, perfect for soups and stir-fry dishes.' },
  { id: 2, name: 'Patatas', price: 'P55 per kg', image: 'patatas.jpg', description: 'Locally grown potatoes, great for frying or mashing.' },
  { id: 3, name: 'Sitaw', price: 'P69 per kg', image: 'sitaw.jpg', description: 'Long beans, excellent for traditional Filipino dishes.' },
  { id: 4, name: 'Luya', price: 'P75 per kg', image: 'luya.jpg', description: 'Fresh ginger, ideal for cooking and herbal drinks.' }
];

const ProductCard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className='bg-gray-600'>
      <section className='py-12 bg-white'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-semibold text-center mb-8 pt-5'>Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
            {products.map((product) => (
              <div key={product.id} className='bg-gray-200 p-4 rounded-lg shadow-md hover:scale-105 transition'>
                <img src={`${imgPath}/${product.image}`} alt={product.name} className='w-full h-40 object-cover rounded-md'/>
                <h3 className='mt-2 font-semibold'>{product.name}</h3>
                <p className='text-green-600 font-bold'>{product.price}</p>
                <button 
                  className='mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700'
                  onClick={() => setSelectedProduct(product)}
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
            <h3 className='text-xl font-semibold'>{selectedProduct.name}</h3>
            <img src={`${imgPath}/${selectedProduct.image}`} alt={selectedProduct.name} className='w-full h-40 object-cover rounded-md my-2'/>
            <p className='text-gray-700'>{selectedProduct.description}</p>
            <p className='text-green-600 font-bold mt-2'>{selectedProduct.price}</p>
            <button 
              className='mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full hover:bg-red-700'
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
