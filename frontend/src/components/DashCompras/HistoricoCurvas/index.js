import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import ChartContainer from "../../ChartContainer";

function HistoricoCurvas(props) {
  const { disponibilidades } = props;

  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [options, setOptions] = useState();

  const meta = 90;

  const montarDados = (disponibilidades) => {
    // Declara arrays que serão montadas
    let labels = [];
    let valores = [[], [], [], []];
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
      valores[0].push(valor["curva_1"]);
      valores[1].push(valor["curva_2"]);
      valores[2].push(valor["curva_3"]);
      valores[3].push(valor["curva_4"]);
    }

    // Monta valores de meta de acordo com a quantidade de valores considerados
    for (let i = 0; i < valores[0].length; i++) {
      valoresMeta.push(meta);
    }

    // Reverte as arrays montadas para exibição correta de novos dados
    labels.reverse();
    for (const valor of valores) valor.reverse();

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
          label: "Curva A",
          data: valores[0],
          borderColor: ["#28a745"],
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: "#28a745",
          tension: 0.4,
        },
        {
          // Dataset de produtos disponíveis
          label: "Curva B",
          data: valores[1],
          borderColor: ["#17a2b8"],
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: "#17a2b8",
          tension: 0.4,
        },

        {
          // Dataset de produtos disponíveis
          label: "Curva C",
          data: valores[2],
          borderColor: ["#007bff"],
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: "#007bff",
          tension: 0.4,
        },
        {
          // Dataset de produtos disponíveis
          label: "Sem Curva",
          data: valores[3],
          borderColor: ["#6c757d"],
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: "#6c757d",
          tension: 0.4,
        },
        {
          // Dataset de Meta - Disponíveis
          label: "Meta",
          data: valoresMeta,
          borderColor: ["#17a2b8"],
          borderWidth: 3,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 0,
          pointBackgroundColor: "#17a2b8",
        },
      ],
    });

    setOptions({
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        y: {
          type: "linear",
          sugestedMin: menorValor + 0.1,
          sugestedMax: maiorValor + 0.1,
          ticks: {
            maxTicksLimit: 10,
            callback: function (value) {
              return value.toFixed(1) + "%";
            },
          },
          scaleLabel: {
            display: false,
            labelString: "Disponibilidade",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Histórico de Disponibilidade (%)",
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            boxWidth: 5,
            padding: 15,
            boxHeight: 7,
          },
        },
      },
      animation: false,
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

export default HistoricoCurvas;
