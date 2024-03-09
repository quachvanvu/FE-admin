import React from 'react'
import MainDash from "../components/MainDash/MainDash";
import RightSide from '../components/RigtSide/RightSide';
import Sidebar from '../components/Sidebar';
import "./dashboard.css"

const Dashboard = () => {
  return (
    <div className="Dashboard">
    <div className="DashboardGlass">
      <Sidebar/>
      <MainDash/>
      <RightSide/>
    </div>
    </div>
  )
}

export default Dashboard