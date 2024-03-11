import React from "react";
import Sidebar from "../components/Sidebar";
import "./css/Products.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Products = () => {
  const [products, setproducts] = useState([]);

  // Function to get all products
  const getAllproducts = async () => {
    try {
      const res = await axios.get("http://localhost:1406/admin/products");
      setproducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete a product
  const deleteproduct = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:1406/admin/delete-product/:${productId}`
      );
      console.log(res.data);
      setproducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="dashboard-container">
          <h1 className="dashboard-heading">Manage Products</h1>
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(
                (product) =>
                  product.role === "product" && (
                    <tr key={product.id} className="product-item">
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteproduct(product.id)}
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

export default Products;
