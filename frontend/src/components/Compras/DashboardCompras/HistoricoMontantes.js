import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import ChartContainer from "../../ChartContainer";
import dayjs from "dayjs";
const minMax = require("dayjs/plugin/minMax");

dayjs.extend(minMax);

function HistoricoMontantes({ historicoMontantes }) {
  const [data, setData] = useState({});
  const [options, setOptions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  function montarLabels(dados) {
    const labels = [];

    dados.forEach((dado) => {
      labels.push(dayjs(dado.data).format("DD/MM"));
    });

    return labels.reverse();
  }

  function montarDatasets(dados) {
    const datasets = {};

    dados.forEach((dado) => {
      for (const chave in dado) {
        const atuais = datasets[chave] || [];

        atuais.push(dado[chave]);

        datasets[chave] = atuais;
      }
    });

    for (const chave in datasets) {
      datasets[chave] = datasets[chave].reverse();
    }

    return datasets;
  }

  useEffect(() => {
    const datasets = montarDatasets(historicoMontantes);
    const labels = montarLabels(historicoMontantes);

    setData({
      labels: labels,
      datasets: [
        {
          label: "Geral",
          data: datasets["montante_geral"],
          borderColor: "rgba(255, 193, 7, 0.6)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(255, 193, 7, 0.6)",
          tension: 0.4,
        },
        {
          label: "Curva A",
          data: datasets["montante_curva_a"],
          borderColor: "rgba(40, 167, 69, 0.6)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(40, 167, 69, 0.6)",
          tension: 0.4,
        },
        {
          label: "Curva B",
          data: datasets["montante_curva_b"],
          borderColor: "rgba(23, 162, 184, 0.6)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(23, 162, 184, 0.6)",
          tension: 0.4,
        },
        {
          label: "Curva C",
          data: datasets["montante_curva_c"],
          borderColor: "rgba(0, 123, 255, 0.6)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(0, 123, 255, 0.6)",
          tension: 0.4,
        },
        {
          label: "Sem Curva",
          data: datasets["montante_sem_curva"],
          borderColor: "rgba(108, 117, 125, 0.6)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(108, 117, 125, 0.6)",
          tension: 0.4,
        },
      ],
    });

    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 7,
          },
        },
        y: {
          ticks: {
            callback: function (value) {
              return parseInt(value / 1000) + "K";
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Histórico de Montantes (R$)",
          align: "end",
          padding: { bottom: 15 },
          font: {
            weight: "bold",
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return (
                `${context.dataset.label}: R$ ` +
                parseInt(
                  parseInt(
                    context.formattedValue.replace(".", "").replace(",", "")
                  ) / 100000
                ) +
                "K"
              );
            },
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

export default HistoricoMontantes;
