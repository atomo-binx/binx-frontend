import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ChartContainer from "../../ChartContainer";

function DisponibilidadePorCurva({ porcentagens }) {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState();
  const [options, setOptions] = useState();

  useEffect(() => {
    setData({
      labels: ["Curva A", "Curva B", "Curva C", "Sem Curva"],
      datasets: [
        {
          type: "line",
          data: [90, 90, 90, 90],
          borderColor: ["#0dcaf0"],
          borderWidth: 3,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 0,
        },
        {
          type: "bar",
          label: "Disponibilidade",
          labels: ["Curva", "Curva B", "Curva C", "Sem Curva"],
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
          borderWidth: 0,
        },
      ],
    });
    setOptions({
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        y: {
          type: "linear",
          max: 100,
          min: 65,
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return (
                `${context.dataset.label}: ` +
                context.formattedValue.replace(".", ",") +
                "%"
              );
            },
          },
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

export default DisponibilidadePorCurva;
