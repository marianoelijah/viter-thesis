import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AddTrade = () => {
  const navigate = useNavigate();
  const currentUserId = parseInt(localStorage.getItem('userId'), 10);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRequesterProductId, setSelectedRequesterProductId] = useState('');
  const [selectedReceiverProductId, setSelectedReceiverProductId] = useState('');
  const [requesterQuantity, setRequesterQuantity] = useState(1);
  const [receiverQuantity, setReceiverQuantity] = useState(1);
  const [requestImageFile, setRequestImageFile] = useState(null);
  const [offerImageFile, setOfferImageFile] = useState(null);

  const [request, setRequest] = useState({ title: '', category: '' });
  const [offer, setOffer] = useState({ title: '', category: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/trades');
        const productsData = await res.json();
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRequesterProductId || !selectedReceiverProductId) {
      alert("Please select both your product and the receiver's product.");
      return;
    }

    const formData = new FormData();
    formData.append('requesterUserId', currentUserId);
    formData.append('requesterProductId', selectedRequesterProductId);
    formData.append('receiverProductId', selectedReceiverProductId);
    formData.append('requestImage', requestImageFile);
    formData.append('offerImage', offerImageFile);
    formData.append('requesterQuantity', requesterQuantity);
    formData.append('receiverQuantity', receiverQuantity);

    try {
      const response = await fetch('http://localhost:3000/api/trades', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit trade.');

      const data = await response.json();
      console.log('Trade submitted:', data);
      alert('Trade submitted successfully!');
    } catch (error) {
      console.error('Error submitting trade:', error);
      alert('Failed to submit trade.');
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    type === 'request' ? setRequestImageFile(file) : setOfferImageFile(file);
  };

  const ProductInputForm = ({ label, type, formState, setFormState, imageFile, setImageFile, quantity, setQuantity, isRequester }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 w-80 mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">{label}</h2>

      <input type="file" onChange={(e) => handleImageChange(e, type)} accept="image/*" className="w-full mb-5 border border-green-300 rounded p-1" />

      <input type="text" placeholder="Product title" value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} className="w-full border border-green-300 p-3 rounded mb-5" required />

      <select value={formState.category} onChange={(e) => setFormState({ ...formState, category: e.target.value })} className="w-full border border-green-300 p-3 rounded mb-6" required>
        <option value="">Select Category</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Grains">Grains</option>
      </select>

      <select
        value={isRequester ? selectedRequesterProductId : selectedReceiverProductId}
        onChange={(e) =>
          isRequester
            ? setSelectedRequesterProductId(e.target.value)
            : setSelectedReceiverProductId(e.target.value)
        }
        className="w-full border border-green-300 p-3 rounded mb-5"
        required
      >
        <option value="">{isRequester ? 'Select Your Product' : "Select Receiver's Product"}</option>
        {products
          .filter((p) => (isRequester ? p.userId === currentUserId : p.userId !== currentUserId))
          .map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
      </select>

      <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full border border-green-300 p-3 rounded mb-5" placeholder="Quantity" />

      <button type="button" onClick={handleViewProducts} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded">
        View Products
      </button>
    </div>
  );

  const handleViewProducts = () => navigate('/productlist');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-10 flex justify-center items-start">
      <div className="w-full max-w-5xl">
        <button onClick={() => navigate(-1)} className="flex items-center mb-6 text-gray-700 hover:text-green-600">
          <ArrowLeft className="mr-2" /> Back
        </button>

        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-12">Trade Products</h1>

        {loading ? (
          <div className="text-center text-green-700 text-xl">Loading products...</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <ProductInputForm
                label="Request"
                type="request"
                formState={request}
                setFormState={setRequest}
                imageFile={requestImageFile}
                setImageFile={setRequestImageFile}
                quantity={requesterQuantity}
                setQuantity={setRequesterQuantity}
                isRequester={true}
              />

              <ProductInputForm
                label="Offer"
                type="offer"
                formState={offer}
                setFormState={setOffer}
                imageFile={offerImageFile}
                setImageFile={setOfferImageFile}
                quantity={receiverQuantity}
                setQuantity={setReceiverQuantity}
                isRequester={false}
              />
            </div>

            <button type="submit" className="mt-8 px-12 py-4 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 shadow-lg">Submit Trade</button>

            <button onClick={() => navigate('/seller/manage-orders')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Go to Manage Trade Orders</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddTrade;
