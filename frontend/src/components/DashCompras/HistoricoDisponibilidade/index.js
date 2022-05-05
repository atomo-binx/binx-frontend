import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import ChartContainer from "../../ChartContainer";

function HistoricoDisponibilidade(props) {
  const { disponibilidades } = props;

  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [options, setOptions] = useState();

  const meta = 92;

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

    if (maiorValor < 92) maiorValor = 92;
    if (menorValor > 92) menorValor = 92;

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
          suggestedMax: maiorValor + 1,
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
          text: "Histórico de Disponibilidade",
          padding: 20,
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
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
          <Line data={data} options={options} />
        </ChartContainer>
      )}
    </>
  );
}

export default HistoricoDisponibilidade;
