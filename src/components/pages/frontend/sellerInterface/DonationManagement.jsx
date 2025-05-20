import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DonationManagement = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/requests")
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched requests:", data);
        setRequests(data);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err.message);
      });
  }, []);



  const handleReject = async (requestId) => {
    try {
      await fetch(`http://localhost:3000/api/requests/${requestId}/reject`, {
        method: "PUT",
      });
      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId ? { ...r, status: "Rejected" } : r
        )
      );
    } catch (err) {
      alert("Failed to reject request");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:3000/api/requests/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error("Failed to update status:", err.message);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            ← Back
          </button>
          <div className="flex items-center gap-2">
            <label className="text-green-700 font-medium">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-green-400 text-green-800 p-2 rounded"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Claimed">Claimed</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-green-800 mb-4 text-center">
          Donation Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-500">
            No donation requests at the moment.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 rounded-lg">
              <thead className="bg-green-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-green-800 border-b">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-green-800 border-b">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-green-800 border-b">
                    Message
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-green-800 border-b">
                    Status
                  </th>
                  <th className="py-3 px-4 text-center font-semibold text-green-800 border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests
                  .filter((req) => filter === "All" || req.status === filter)
                  .map((req) => (
                    <tr
                      key={req.id}
                      className={`border-b border-gray-200 hover:bg-green-50 transition-colors ${
                        req.status === "Rejected"
                          ? "line-through text-red-500"
                          : ""
                      }`}
                    >
                      <td className="py-4 px-4">{req.name}</td>
                      <td className="py-4 px-4">{req.email}</td>
                      <td
                        className="py-4 px-4 max-w-xs truncate"
                        title={req.message}
                      >
                        {req.message}
                      </td>
                      <td className="py-4 px-4">
                        {req.status === "Approved" ? (
                          <select
                            value={req.status}
                            onChange={(e) =>
                              handleStatusUpdate(req.id, e.target.value)
                            }
                            className="border p-1 rounded"
                          >
                            {["Approved", "Claimed", "Completed"].map(
                              (status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          req.status || "Pending"
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {req.status === "Pending" && (
                          <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                            <button
                              onClick={() => handleGrant(req.id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                            >
                              Grant
                            </button>
                            <button
                              onClick={() => handleReject(req.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationManagement;
