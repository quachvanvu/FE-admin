import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Orders.css";
import { toast } from "react-toastify";

const Orders = () => {
  const [ordersByStatus, setOrdersByStatus] = useState({
    pending: [],
    completed: [],
    cancelled: [],
  });

  const fetchOrdersByStatus = async (status) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/order-status?status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${status} orders:`, error);
      return [];
    }
  };

  const fetchAllOrders = async () => {
    const pending = await fetchOrdersByStatus("pending");
    const completed = await fetchOrdersByStatus("completed");
    const cancelled = await fetchOrdersByStatus("cancelled");

    setOrdersByStatus({
      pending: pending,
      completed: completed,
      cancelled: cancelled,
    });
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleCancelled = async (orderId) => {
    const isConfirmed = window.confirm("Bạn có chắc muốn hủy đơn hàng này?");

    if (!isConfirmed) {
      return;
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/admin/order-status`, {
        orderId,
        status: "cancelled",
      });
      await fetchAllOrders();
      toast.success("Order cancelled successfully!");
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Failed to cancel order.");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/admin/order-status`, {
        orderId,
        status,
      });
      // Clear the order from the pending list
      const updatedPendingOrders = ordersByStatus.pending.filter(
        (order) => order.id !== orderId
      );
      await fetchAllOrders();
      toast.success("Order confirmed successfully!");
      setOrdersByStatus((prevState) => ({
        ...prevState,
        pending: updatedPendingOrders,
      }));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return ` ${day}-${month}-${year}`;
  }

  const renderOrders = (orders, status) => (
    <>
      {orders.map((order) => (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.name}</td>
          <td>{formatDateTime(order.created_at)}</td>
          <td>
            {order.total_amount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}
          </td>
          <td>{order.provider}</td>
          <td>{order.payment_status}</td>
          <td>
            {status === "pending" && order.payment_status === "pending" && (
              <>
                <button
                  className="confirm-button"
                  onClick={() => updateOrderStatus(order.id, "completed")}
                >
                  Confirm
                </button>
                <button
                  className="cancelled-button"
                  onClick={() => handleCancelled(order.id)}
                >
                  Cancelled
                </button>
              </>
            )}
          </td>
        </tr>
      ))}
    </>
  );

  const renderTable = () => (
    <div className="order-table">
      <h2>All Orders</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Provider</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {renderOrders(ordersByStatus.pending, "pending")}
            {renderOrders(ordersByStatus.completed, "completed")}
            {renderOrders(ordersByStatus.cancelled, "cancelled")}
          </tbody>
        </table>
      </div>
    </div>
  );

  return <div className="order-container">{renderTable()}</div>;
};

export default Orders;
