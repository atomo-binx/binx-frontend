import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

import ChartContainer from "../../ChartContainer";

function IndisponibilidadeCurva(props) {
  const { porcentagens } = props;

  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState();
  const [options, setOptions] = useState();

  useEffect(() => {
    setData({
      labels: ["Curva A", "Curva B", "Curva C", "Sem Curva"],
      datasets: [
        {
          data: [
            porcentagens[0],
            porcentagens[1],
            porcentagens[2],
            porcentagens[3],
          ],
          backgroundColor: ["#28a745", "#0dcaf0", "#007bff", "#6c757d"],
          borderWidth: 4,
        },
      ],
    });
    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Produtos Indisponíveis Por Curva (%)",
        },
        legend: {
          position: "right",
          align: "center",
          labels: {
            usePointStyle: true,
            boxWidth: 15,
            padding: 15,
          },
        },
      },
      animation: {
        duration: 3000,
      },
    });
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded && (
        <ChartContainer>
          <Doughnut data={data} options={options} />
        </ChartContainer>
      )}
    </>
  );
}

export default IndisponibilidadeCurva;
