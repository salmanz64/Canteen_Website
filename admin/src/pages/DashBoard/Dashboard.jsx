import React, { useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./Dashboard.css";

Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  useEffect(() => {
    document.getElementById("currentDate").textContent = new Date().toLocaleDateString();
  }, []);

  const salesData = {
    labels: ["Idli", "Snacks", "Meals", "Desserts", "Appam", "Chappathi", "Biriyani"],
    datasets: [
      {
        label: "Sales Distribution",
        data: [300, 450, 700, 200, 350, 500, 600],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(0, 128, 0, 0.5)",
        ],
      },
    ],
  };

  return (
    <div className="dashboard-container">
    
     
      
      {/* Main Content */}
      <div className="main-content">
        <h1 className="heading">Dashboard Overview</h1>
        <div className="stats-grid">
          <div className="stat-box">Total Orders: <span>120</span></div>
          <div className="stat-box">Total Earnings: <span>$1,500</span></div>
          <div className="stat-box">Pending Orders: <span>5</span></div>
          <div className="stat-box">Total Customers: <span>200</span></div>
          <div className="stat-box">Date: <span id="currentDate"></span></div>
        </div>

        {/* Pie Chart */}
        <div className="chart-container">
          <h3>Sales Distribution</h3>
          <Pie data={salesData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;