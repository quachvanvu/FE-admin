import React from "react";
import "./css/Customer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../App.css";

const Customer = () => {
  const [users, setUsers] = useState([]);

  // Function to get all users
  // const getAllUsers = async () => {
   
  // };

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:1406/admin/manage/:${userId}`
      );
      console.log(res.data);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { 
    async function getUsers() {
      try {
        const res = await axios.get("http://localhost:1406/admin/manage");
        console.log(res.data)
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  getUsers();
  }, []);

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
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
      </div>
    </div>
  );
};

export default Customer;
