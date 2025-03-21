import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminApproval = () => {
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const url = "http://localhost:4000"; //backend URL

  useEffect(() => {
    const fetchPendingAdmins = async () => {
      try {
        const response = await axios.get(`${url}/api/admin/pending`);
        if (response.data.success) {
          setPendingAdmins(response.data.pendingAdmins);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching pending registrations: " + error.message);
      }
    };

    fetchPendingAdmins();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await axios.post(`${url}/api/admin/approve/${id}`);
      if (response.data.success) {
        toast.success("Admin approved successfully!");
        setPendingAdmins(pendingAdmins.filter((admin) => admin._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error approving admin: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center">Pending Admin Approvals</h2>
      <ul className="list-group mt-3">
        {pendingAdmins.length > 0 ? (
          pendingAdmins.map((admin) => (
            <li key={admin._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <strong>{admin.name}</strong> ({admin.email})
              </span>
              <button
                onClick={() => handleApprove(admin._id)}
                className="btn btn-success btn-sm"
              >
                Approve
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item text-center">No pending registrations.</li>
        )}
      </ul>
    </div>
  );
};

export default AdminApproval;
