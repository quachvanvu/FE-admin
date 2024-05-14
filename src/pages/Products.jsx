import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/Products.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  // Function to get products for a specific page
  const getProductsByPage = async (page) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/products?page=${page}`
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
        `${process.env.REACT_APP_API_URL}/admin/delete-product/:${productId}`
      );
      console.log(res.data);
      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  };

  //Function to handle addProduct
  const handleAddProduct = () => {
    navigate("/addProduct");
  };

  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < 5) {
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

  // Function to handle product update
  const updateProduct = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/update-product`,
        selectedProduct
      );
      console.log(res.data);
      toast.success("Product updated successfully!");
      // Gọi lại API để lấy danh sách sản phẩm sau khi cập nhật
      getProductsByPage(currentPage);
      // Đóng form hoặc modal
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Error updating product");
    }
  };

  // Function to handle selecting a product for update
  const selectProductForUpdate = (product) => {
    setSelectedProduct(product);
    // Mở form hoặc modal
    setShowEditModal(true);
  };

  useEffect(() => {
    getProductsByPage(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-heading-container">
          <h1 className="dashboard-heading">Quản lý Sản phẩm</h1>
          <button className="add-product-button" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>

        {products.length > 0 && (
          <div className="product-table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>image</th>
                  <th style={{ width: "30%" }}>Name</th>
                  <th style={{ width: "15%" }}>Category</th>
                  <th style={{ width: "15%" }}>Price</th>
                  <th style={{ width: "15%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="product-item">
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-image"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>
                      {product.newPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}
                    </td>
                    <td className="btn">
                      <button
                        className="update-btn"
                        onClick={() => selectProductForUpdate(product)}
                      >
                        Update
                      </button>
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
              <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                Previous
              </button>
              {[...Array(6)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={index === currentPage ? "active" : ""}
                >
                  {index}
                </button>
              ))}
              <button onClick={handleNextPage} disabled={currentPage === 5}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>
              &times;
            </span>
            <h2>Edit Product</h2>
            <form>
              {/* Thêm các trường nhập liệu cho việc cập nhật sản phẩm */}
              <label>Tên sản phẩm</label>
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
              />
              <label>Nhãn hàng</label>
              <input
                type="text"
                value={selectedProduct.category}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: e.target.value,
                  })
                }
              />

              <label>Thông số màn hình</label>
              <input
                type="text"
                value={selectedProduct.screen}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    screen: e.target.value,
                  })
                }
              />

              <label>Giá</label>
              <input
                type="number"
                value={selectedProduct.newPrice}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    newPrice: e.target.value,
                  })
                }
              />

              <label>Chip</label>
              <input
                type="text"
                value={selectedProduct.chip}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    chip: e.target.value,
                  })
                }
              />

              <label>Camera trước</label>
              <input
                type="text"
                value={selectedProduct.selfieCam}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    selfieCam: e.target.value,
                  })
                }
              />

              <label>Camera sau</label>
              <input
                type="text"
                value={selectedProduct.behindCam}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    behindCam: e.target.value,
                  })
                }
              />

              <label>Ram</label>
              <input
                type="text"
                value={selectedProduct.ram}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    ram: e.target.value,
                  })
                }
              />

              <label>Bộ nhớ trong</label>
              <input
                type="text"
                value={selectedProduct.rom}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    rom: e.target.value,
                  })
                }
              />

              <label>Pin</label>
              <input
                type="text"
                value={selectedProduct.pin}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    pin: e.target.value,
                  })
                }
              />

              <label>Tốc độ sạc</label>
              <input
                type="text"
                value={selectedProduct.chargeSpeed}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    chargeSpeed: e.target.value,
                  })
                }
              />

              <label>Số lượng trong kho</label>
              <input
                type="text"
                value={selectedProduct.quantity}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity: e.target.value,
                  })
                }
              />

              <button type="button" onClick={updateProduct}>
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
