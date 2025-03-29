import React from 'react'
import { useLocation } from "react-router-dom";

const TransactionPage = () => {
    const location = useLocation();
    const cart = location.state?.cart || []; // Retrieve cart from state

    const handleCheckout = () => {
        alert("Transaction processed successfully!");
        // Here, we can integrate with backend to process transactions
    };

  return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transaction Summary</h1>
            {cart.length === 0 ? (
                <p className="text-gray-600">No items in transaction.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cart.map((item) => (
                        <div key={item.id} className="border p-4 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold">{item.name}</h2>
                            <p className="font-bold">P{item.price} per kg</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: P{item.price * item.quantity}</p>
                        </div>
                    ))}
                </div>
            )}
            {cart.length > 0 && (
                <button
                    onClick={handleCheckout}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Confirm Transaction
                </button>
            )}
        </div>
    );
}

export default TransactionPage
