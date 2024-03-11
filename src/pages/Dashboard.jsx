import React from "react";
import "./css/dashboard.css";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
