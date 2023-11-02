import { Link, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import './DashboardContent.css'
import BillChartProfit from "../../Charts/BillChartProfit";
import BillChart from "../../Charts/BillChart";
import { useEffect, useState } from "react";
import BASE_URL from "../../../api/baseapi";

const DashboardContent = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const [dashboardData, setDashboardData] = useState({});




    useEffect(() => {
      fetch(`${BASE_URL}/manage/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })

        .then((dataJson) => {
          const data = {
            totalUser: dataJson.totalUser,
            newUser: dataJson.newUser,
            totalSubject: dataJson.totalSubject,
            salesStatistic: dataJson.salesStatistic,
            orderStatistic: dataJson.orderStatistic,
          };

          return data;
        })

        .then((result) => {
          const mockData = result;
          setDashboardData(mockData);
        });
    }, []);

    return (
      <div className="dashboard-wrap">
        <div>
          <h2 className="dashboard-title">Statistical</h2>
          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <div class="text-center card-stats">
                    <h3 className="dashboard-box-header">{dashboardData.totalUser}</h3>
                    <h5 className="dashboard-box-content">All customers</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <div class="text-center card-stats">
                    <h3 className="dashboard-box-header">{dashboardData.newUser}</h3>
                    <h5 className="dashboard-box-content">New Users</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <div class="text-center card-stats">
                    <h3 className="dashboard-box-header">{dashboardData.totalSubject}</h3>
                    <h5 className="dashboard-box-content">Total Subjects</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="dashboard-title">Revenue this year</h2>
          <BillChartProfit billData={dashboardData.salesStatistic} />
        </div>

        <div>
          <h2 className="dashboard-title">Order statistics</h2>
          <BillChart billData={dashboardData.orderStatistic} />
        </div>
      </div>
    );
};

export default DashboardContent;
