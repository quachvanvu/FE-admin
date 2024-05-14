import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./css/dashboard.css";

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/order-status?status=completed`
        );
        console.log(ordersResponse);
        if (ordersResponse.data && ordersResponse.data.length > 0) {
          setTotalOrders(ordersResponse.data.length);
        }
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng:", error);
      }
    };

    const fetchTotalAmount = async () => {
      try {
        const totalAmountResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/total-amount`
        );
        if (totalAmountResponse.data && totalAmountResponse.data.length > 0) {
          let totalAmountSum = 0;

          totalAmountResponse.data[0].forEach((item) => {
            totalAmountSum += parseFloat(item.total_amount_sum);
          });
          setTotalAmount(totalAmountSum);
        }
      } catch (error) {
        console.error("Lỗi khi tải tổng số tiền:", error);
      }
    };

    fetchOrders();
    fetchTotalAmount();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/total-per-month`
        );
        setMonthlyData(response.data);
        renderChart(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const renderChart = (data) => {
    const labels = data[0].map((item) => `${item.month}/${item.year}`);
    const totalOrders = data[0].map((item) => item.total_orders);
    const totalAmounts = data[0].map((item) => parseFloat(item.total_amount));

    const ctx = document.getElementById("monthlyChart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tổng số đơn hàng",
            data: totalOrders,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            yAxisID: "y-axis-1",
          },
          {
            label: "Tổng số tiền",
            data: totalAmounts,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            yAxisID: "y-axis-2",
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              type: "linear",
              display: true,
              position: "left",
              id: "y-axis-1",
            },
            {
              type: "linear",
              display: true,
              position: "right",
              id: "y-axis-2",
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
        },
      },
    });
  };

  return (
    <div className="order-container">
      <div className="order-box">
        <div className="order-number">{totalOrders}</div>
        <div className="order-label">Đơn hàng</div>
      </div>
      <div className="order-box1">
        <div className="amount-number">
          {totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}
        </div>
        <div className="amount-label">Tổng số tiền</div>
      </div>
      <canvas id="monthlyChart"></canvas>
    </div>
  );
};

export default Dashboard;
