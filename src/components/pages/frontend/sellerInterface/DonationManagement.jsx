import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DonationsManagement = () => {
   const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

 const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/donation-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      await axios.put(`http://localhost:3000/api/donation-requests/${requestId}`, {
        status: action,
      });
      toast.success(`Request ${action}`);
      fetchRequests();
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update request.");
    }
  };
  

   return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Donation Requests</h1>
      {requests.length === 0 ? (
        <p>No donation requests yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Product</th>
              <th>Buyer</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="p-2">{req.product_name}</td>
                <td>{req.buyer_name}</td>
                <td>{req.quantity}</td>
                <td>{req.status}</td>
                <td>{new Date(req.request_date).toLocaleString()}</td>
                <td>
                  {req.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(req.id, "approved")}
                        className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default DonationsManagement;
