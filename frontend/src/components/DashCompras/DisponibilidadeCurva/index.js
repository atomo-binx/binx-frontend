import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ChartContainer from "../../ChartContainer";

function DisponibilidadeCurva(props) {
  const { porcentagens } = props;

  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState();
  const [options, setOptions] = useState();

  useEffect(() => {
    setData({
      labels: ["Curva A", "Curva B", "Curva C", "Sem Curva"],
      datasets: [
        {
          label: "Meta",
          type: "line",
          data: [92, 92, 92, 92],
          borderColor: ["#0dcaf0"],
          borderWidth: 3,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 0,
        },
        {
          label: "Disponibilidades",
          type: "bar",
          data: [
            porcentagens[0],
            porcentagens[1],
            porcentagens[2],
            porcentagens[3],
          ],
          backgroundColor: [
            "rgba(40, 167, 69, 0.5)",
            "rgba(23, 162, 184, 0.5)",
            "rgba(0, 123, 255, 0.5)",
            "rgba(108, 117, 125, 0.5)",
          ],
          borderColor: ["#28a745", "#0dcaf0", "#007bff", "#6c757d"],
          borderWidth: 2,
        },
      ],
    });
    setOptions({
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        yAxes: {
          type: "linear",
          max: 100,
          min: 50,
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Disponibilidade por Curva (%)",
        },
        legend: {
          display: false,
        },
      },
      animation: false,
    });
    setLoaded(true);
  }, [porcentagens]);

  return (
    <>
      {loaded && (
        <ChartContainer>
          <Bar data={data} options={options} />
        </ChartContainer>
      )}
    </>
  );
}

export default DisponibilidadeCurva;
