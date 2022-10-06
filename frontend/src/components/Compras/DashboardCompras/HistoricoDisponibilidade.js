import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import ChartContainer from "../../ChartContainer";

function HistoricoDisponibilidade({ disponibilidades }) {
  const [data, setData] = useState({});
  const [options, setOptions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const meta = 90;

  const montarDados = (disponibilidades) => {
    // Declara arrays que serão montadas
    let labels = [];
    let valores = [];
    let valoresMeta = [];

    // Monta Labels com as datas de disponibilidades
    for (const data of disponibilidades) {
      let dataMontada =
        data["data"][8] +
        data["data"][9] +
        "/" +
        data["data"][5] +
        data["data"][6];
      labels.push(dataMontada);
    }

    // Monta valores de disponibilidade
    for (const valor of disponibilidades) {
      valores.push(valor["valor"]);
      valoresMeta.push(meta);
    }

    // Reverte as arrays montadas para exibição correta de novos dados
    labels.reverse();
    valores.reverse();

    // Encontra o menor e maior valor existente nos dados
    let menorValor = Math.min.apply(Math, valores);
    let maiorValor = Math.max.apply(Math, valores);

    if (maiorValor < meta) maiorValor = meta;
    if (menorValor > meta) menorValor = meta;

    menorValor = isFinite(menorValor) ? menorValor : 0;
    maiorValor = isFinite(maiorValor) ? maiorValor : 100;

    return { valores, labels, valoresMeta, menorValor, maiorValor };
  };

  useEffect(() => {
    let { valores, labels, valoresMeta, menorValor, maiorValor } =
      montarDados(disponibilidades);

    setData({
      labels: labels,
      datasets: [
        {
          // Dataset de produtos disponíveis
          label: "Disponíveis",
          data: valores,
          borderColor: ["#198754"],
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: "#198754",
          tension: 0.4,
        },
        {
          // Dataset de Meta - Disponíveis
          label: "Meta",
          data: valoresMeta,
          borderColor: ["#0dcaf0"],
          borderWidth: 3,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 0,
          pointBackgroundColor: "#0dcaf0",
        },
      ],
    });

    setOptions({
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        y: {
          type: "linear",
          suggestedMin: menorValor - 0.1,
          suggestedMax: maiorValor + 0.1,
          ticks: {
            maxTicksLimit: 10,
            callback: function (value) {
              return value.toFixed(1) + "%";
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Histórico de Disponibilidade (%)",
          align: "end",
          padding: { bottom: 15 },
          font: {
            weight: "bold",
          },
        },
        legend: {
          display: false,
          position: "top",
          labels: {
            usePointStyle: true,
            boxHeight: 7,
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
          <Line data={data} options={options} />
        </ChartContainer>
      )}
    </>
  );
}

export default HistoricoDisponibilidade;
