import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products on mount
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold text-green-700 mb-6">Product Dashboard</h1>

        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/seller/add-product")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
          >
            + Add New Product
          </button>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-xl shadow-md">
                <img
                  src={`http://localhost:3000/uploads/${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-bold text-green-700">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-gray-800 font-semibold">₱{product.price}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {product.quantity} | Stock: {product.availableStock}
                </p>
                <p className="text-sm text-gray-500">Category: {product.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDashboard;
