import React from "react";
import "./css/Customer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customer = () => {
  const [users, setUsers] = useState([]);

  // Function to get all users
  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:1406/admin/manage");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:1406/admin/manage/:${userId}`
      );
      console.log(res.data);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Manage Users</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(
            (user) =>
              user.role === "user" && (
                <tr key={user.id} className="user-item">
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
