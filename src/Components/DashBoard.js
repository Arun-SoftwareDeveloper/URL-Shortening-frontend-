import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/DashBoard.css";

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://url-shortning.onrender.com/dashboard"
      );
      console.log("Response data:", response.data); // Add this line
      setData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Dashboard</h2>
        {data.urlsPerDay ? (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Number of URLs Created</th>
              </tr>
            </thead>
            <tbody>
              {data.urlsPerDay.map((item) => (
                <tr key={item.date}>
                  <td>{item.date}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="loading-message">Loading...</p>
        )}
      </div>
      <Link to="/shorten">
        <button type="button" className="create-btn">
          Generate URL
        </button>
      </Link>
      <Link to="/created">
        <button type="button" className="list-btn">
          URL List
        </button>
      </Link>
    </>
  );
};

export default Dashboard;
