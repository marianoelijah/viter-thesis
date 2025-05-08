import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/components/context/CartContext";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const products = [
  { id: 1, name: "Papaya", price: 75, image: "/img/papaya.jpg", description: "Ripe and juicy papayas, rich in vitamins and antioxidants.", category: "Fruit" },
  { id: 2, name: "Ampalaya", price: 45, image: "/img/ampalaya.jpg", description: "Fresh bitter melon, great for heart health and diabetes management.", category: "Vegetable" },
  { id: 3, name: "Sitaw", price: 50, image: "/img/sitaw.jpg", description: "Long green beans, crisp and packed with fiber and nutrients.", category: "Vegetable" },
  { id: 4, name: "Mais", price: 35, image: "/img/mais.jpg", description: "Sweet and golden corn, perfect for roasting or boiling.", category: "Grain" },
  { id: 5, name: "Luya", price: 75, image: "/img/luya.jpg", description: "Aromatic ginger, ideal for cooking and herbal tea.", category: "Spice" },
  { id: 6, name: "Calabasa", price: 55, image: "/img/calabasa.jpg", description: "Nutritious squash, great for soups and stews.", category: "Vegetable" },
  { id: 7, name: "Pechay", price: 45, image: "/img/pechay.jpg", description: "Fresh and leafy pechay, a staple in many Filipino dishes.", category: "Vegetable" },
  { id: 8, name: "Patatas", price: 35, image: "/img/patatas.jpg", description: "Firm and versatile potatoes, perfect for any dish.", category: "Root Crop" },
  { id: 9, name: "Sibuyas", price: 80, image: "/img/sibuyas.jpg", description: "Freshly harvested onions, essential for adding flavor to meals.", category: "Spice" },
  { id: 10, name: "Bawang", price: 65, image: "/img/bawang.jpg", description: "Pungent and flavorful garlic, perfect for seasoning.", category: "Spice" },
  { id: 11, name: "Okra", price: 55, image: "/img/okra.jpg", description: "Tender okra pods, great for soups and stir-fries.", category: "Vegetable" },
  { id: 12, name: "Sili", price: 90, image: "/img/sili.jpg", description: "Spicy chili peppers to add heat to your favorite dishes.", category: "Spice" },
  { id: 13, name: "Mango", price: 95, image: "/img/mango.jpg", description: "Sweet and succulent mangoes, perfect for desserts and snacks.", category: "Fruit" },
  { id: 14, name: "Star Apple", price: 95, image: "/img/starapple.jpg", description: "Juicy and milky star apples, a tropical favorite rich in fiber.", category: "Fruit" },
  { id: 15, name: "Atis", price: 100, image: "/img/atis.jpg", description: "Creamy and sweet custard apples, loaded with vitamin C.", category: "Fruit" },
  { id: 16, name: "Dalandan", price: 70, image: "/img/dalandan.jpg", description: "Tangy and refreshing dalandan, great for juice or snacking.", category: "Fruit" },
  { id: 17, name: "Orange", price: 150, image: "/img/orange.jpg", description: "Juicy and zesty oranges, packed with vitamin C.", category: "Fruit" },
  { id: 18, name: "Carrots", price: 90, image: "/img/carrots.jpg", description: "Crunchy carrots, excellent for eyesight and immune support.", category: "Vegetable" },
  { id: 19, name: "Saging", price: 140, image: "/img/saging.jpg", description: "Protein that gives energy to our body.", category: "Fruit" }
];

const Productss = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesMin = minPrice === "" || product.price >= parseFloat(minPrice);
    const matchesMax = maxPrice === "" || product.price <= parseFloat(maxPrice);
    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  const handleBuyNow = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
    navigate("/checkout");
  };

  useEffect(() => {
    if (filteredProducts.length === 1) {
      setSelectedProduct(filteredProducts[0]);
    } else {
      setSelectedProduct(null);
    }
  }, [filteredProducts]);

  const recommendedProducts = selectedProduct
    ? products.filter(
        (product) =>
          product.category === selectedProduct.category &&
          product.id !== selectedProduct.id
      )
    : [];

  const uniqueCategories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-green-600 mb-4">
        <ArrowLeft className="mr-2" /> Back
      </button>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">Buy Local Products</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        >
          {uniqueCategories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Product List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition duration-200 flex flex-col"
              onMouseEnter={() => setSelectedProduct(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              <p className="mt-1 text-green-700 font-bold">₱{product.price}</p>
              <div className="mt-auto flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success(`${product.name} added to cart!`);
                  }}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full sm:w-1/2"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recommendations */}
      {selectedProduct && recommendedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
            You May Also Like (More from {selectedProduct.category})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((rec) => (
              <div key={rec.id} className="bg-gray-100 rounded-xl p-4 shadow">
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="font-semibold text-lg">{rec.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{rec.description}</p>
                <p className="font-bold text-green-700 mt-1">₱{rec.price}</p>
                <button
                  onClick={() => addToCart(rec)}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Productss;
