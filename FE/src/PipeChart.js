import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = (prop) => {
  const trueAnswer = prop.trueAnswer;
  const falseAnswer = prop.falseAnswer;
  const nullAnswer = prop.nullAnswer;
  const data = {
    labels: ["True Answer", "Null Answer", "False Answer"],
    datasets: [
      {
        labels: "Test result",
        data: [trueAnswer, falseAnswer, nullAnswer],
        backgroundColor: ["#19A38C", "#F4522D", "#6A6F73"],
      },
    ],
  };

  const options = {
    legend: {
      display: true,
      align: "left",
      position: "right",
    },
  };

  return (
    <div style={{ width: "200px", height: "200px" }} className="">
      <Pie data={data} options={options}/>
    </div>
  );
};

export default PieChart;
