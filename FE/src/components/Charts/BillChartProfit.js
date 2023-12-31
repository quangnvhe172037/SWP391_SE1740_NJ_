import React from "react";
import { Bar } from "react-chartjs-2";
import BASE_URL from "../../api/baseapi";
const BillChartProfit = ({ billData }) => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Profit",
        data: billData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "600px", margin: "50px auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BillChartProfit;
