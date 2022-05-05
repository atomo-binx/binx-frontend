import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartContainer from "../../ChartContainer";

function GraficoDisponibilidade(props) {
  const { pDisponivel, pIndisponivel } = props;
  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setData({
      labels: ["Disponíveis", "Indisponíveis"],
      datasets: [
        {
          data: [pDisponivel, pIndisponivel],
          backgroundColor: ["#198754", "#dc3545"],
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
          text: "Disponibilidade de Produtos",
        },
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
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

export default GraficoDisponibilidade;
