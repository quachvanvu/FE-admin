import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  // Function to get products for a specific page
  const getProductsByPage = async (page) => {
    try {
      const res = await axios.get(
        `http://localhost:1406/admin/products?page=${page}`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:1406/admin/delete-product/${productId}`
      );
      console.log(res.data);
      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  };

  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
      getProductsByPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      getProductsByPage(currentPage - 1);
    }
  };

  useEffect(() => {
    getProductsByPage(currentPage);
  }, [currentPage]);

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="dashboard-container">
          <h1 className="dashboard-heading">Quản lý Sản phẩm</h1>
          {products.length > 0 && (
            <div>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="product-item">
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.newPrice}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this product?"
                              )
                            ) {
                              deleteProduct(product.id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={index === currentPage ? "active" : ""}
                  >
                    {index}
                  </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === 4}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
};

export default Products;
