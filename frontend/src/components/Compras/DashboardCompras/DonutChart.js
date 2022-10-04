import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartContainer from "../../ChartContainer";

function DonutChart({ percentValue, color }) {
  const [data, setData] = useState({});
  const [options, setOptions] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setData({
      labels: [percentValue + "%"],
      datasets: [
        {
          data: [percentValue, 100 - percentValue],
          backgroundColor: [color, "#f0f0f0"],
        },
      ],
    });
    setOptions({
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: "chartArea",
          labels: {
            padding: 15,
            boxWidth: 0,
            font: {
              weight: "bold",
              size: 14,
            },
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      animation: {
        duration: 3000,
      },
      events: [],
      cutout: "75%",
    });

    setLoaded(true);
  }, []);

  return (
    <>
      {loaded && (
        <ChartContainer>
          <Doughnut data={data} options={options} width={80} />
        </ChartContainer>
      )}
    </>
  );
}

export default DonutChart;
