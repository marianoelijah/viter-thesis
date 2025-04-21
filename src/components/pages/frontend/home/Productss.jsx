import { imgPath } from "@/components/helpers/functions-general";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { CartContext } from "@/components/context/CartContext";

const products = [
  { id: 1, name: "Papaya", price: "P75 per kg", image: "papaya.jpg", description: "Ripe and juicy papayas, rich in vitamins and antioxidants.", category: "Fruit" },
  { id: 2, name: "Ampalaya", price: "P45 per kg", image: "ampalaya.jpg", description: "Fresh bitter melon, great for heart health and diabetes management.", category: "Vegetable" },
  { id: 3, name: "Sitaw", price: "P50 per kg", image: "sitaw.jpg", description: "Long green beans, crisp and packed with fiber and nutrients.", category: "Vegetable" },
  { id: 4, name: "Mais", price: "P35 per kg", image: "mais.jpg", description: "Sweet and golden corn, perfect for roasting or boiling.", category: "Grain" },
  { id: 5, name: "Luya", price: "P75 per kg", image: "luya.jpg", description: "Aromatic ginger, ideal for cooking and herbal tea.", category: "Spice" },
  { id: 6, name: "Calabasa", price: "P55 per kg", image: "calabasa.jpg", description: "Nutritious squash, great for soups and stews.", category: "Vegetable" },
  { id: 7, name: "Pechay", price: "P45 per kg", image: "pechay.jpg", description: "Fresh and leafy pechay, a staple in many Filipino dishes.", category: "Vegetable" },
  { id: 8, name: "Patatas", price: "P35 per kg", image: "patatas.jpg", description: "Firm and versatile potatoes, perfect for any dish.", category: "Root Crop" },
  { id: 9, name: "Sibuyas", price: "P80 per kg", image: "sibuyas.jpg", description: "Freshly harvested onions, essential for adding flavor to meals.", category: "Spice" },
  { id: 10, name: "Bawang", price: "P65 per kg", image: "bawang.jpg", description: "Pungent and flavorful garlic, perfect for seasoning.", category: "Spice" },
  { id: 11, name: "Okra", price: "P59 per kg", image: "okra.jpg", description: "Tender okra pods, great for soups and stir-fries.", category: "Vegetable" },
  { id: 12, name: "Sili", price: "P90 per kg", image: "sili.jpg", description: "Spicy chili peppers to add heat to your favorite dishes.", category: "Spice" },
  { id: 13, name: "Mango", price: "P90 per kg", image: "mango.jpg", description: "Sweet and succulent mangoes, perfect for desserts and snacks.", category: "Fruit" },
  { id: 14, name: "Star Apple", price: "P90 per kg", image: "starapple.jpg", description: "Juicy and milky star apples, a tropical favorite rich in fiber.", category: "Fruit" },
  { id: 15, name: "Atis", price: "P90 per kg", image: "atis.jpg", description: "Creamy and sweet custard apples, loaded with vitamin C.", category: "Fruit" },
  { id: 16, name: "Dalandan", price: "P90 per kg", image: "dalandan.jpg", description: "Tangy and refreshing dalandan, great for juice or snacking.", category: "Fruit" },
  { id: 17, name: "Orange", price: "P90 per kg", image: "orange.jpg", description: "Juicy and zesty oranges, packed with vitamin C.", category: "Fruit" },
  { id: 18, name: "Carrots", price: "P90 per kg", image: "carrots.jpg", description: "Crunchy carrots, excellent for eyesight and immune support.", category: "Vegetable" }
];


const Productss = () => {
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace("P", "").replace(" per kg", "")),
      image: product.image,
      quantity: 1,
    });
  };

  const relatedProducts = (product) => {
    return products.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8 hover:text-red-600 transition">
        Available Products
      </h1>

      <Link to="/home">
        <button className="m-4 bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300">
          Back to Home
        </button>
      </Link>

      {!selectedProduct ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg text-center hover:scale-105 transition duration-300 flex flex-col justify-between"
            >
              <img
                src={`${imgPath}/${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-green-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {product.description}
                </p>
                <p className="text-green-700 font-bold mt-2">{product.price}</p>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button
            onClick={() => setSelectedProduct(null)}
            className="mb-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            ← Back to Products
          </button>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={`${imgPath}/${selectedProduct.image}`}
              alt={selectedProduct.name}
              className="w-full md:w-1/3 h-auto object-cover rounded"
            />
            <div>
              <h2 className="text-2xl font-bold text-green-800">{selectedProduct.name}</h2>
              <p className="mt-2 text-gray-700">{selectedProduct.description}</p>
              <p className="mt-2 font-semibold text-green-700">{selectedProduct.price}</p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
                <Link to="/cashout">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedProducts(selectedProduct).map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-lg hover:shadow-lg transition text-center"
                >
                  <img
                    src={`${imgPath}/${product.image}`}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <h4 className="font-semibold text-green-700 mt-2">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.price}</p>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productss;
