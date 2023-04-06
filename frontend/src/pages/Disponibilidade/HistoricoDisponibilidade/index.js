import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import ChartContainer from "../../../components/ChartContainer";

function HistoricoDisponibilidade({ disponibilidades }) {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [options, setOptions] = useState();

  const montarLabels = (disponibilidades) => {
    const dataLabels = [];

    disponibilidades.forEach((registro) => {
      dataLabels.push(registro.data.substring(0, 5));
    });

    return dataLabels;
  };

  const montarDatasets = (disponibilidades) => {
    const datasets = {};

    disponibilidades.forEach((registro) => {
      for (const chave in registro) {
        const atuais = datasets[chave] || [];

        atuais.push(registro[chave]);

        datasets[chave] = atuais;
      }
    });

    return datasets;
  };

  useEffect(() => {
    const dataLabels = montarLabels(disponibilidades);
    const dataset = montarDatasets(disponibilidades);

    setData({
      labels: dataLabels,
      datasets: [
        {
          label: "Geral",
          data: dataset["geral"],
          borderWidth: 2,
          pointBackgroundColor: "rgba(255, 193, 7, 0.6)",
          borderColor: "rgba(255, 193, 7, 0.6)",
          tension: 0.4,
        },
        {
          label: "Curva A",
          data: dataset["curva_1"],
          borderWidth: 2,
          pointBackgroundColor: "rgba(40, 167, 69, 0.5)",
          borderColor: "rgba(40, 167, 69, 0.5)",
          tension: 0.4,
        },
        {
          label: "Curva B",
          data: dataset["curva_2"],
          borderWidth: 2,
          pointBackgroundColor: "rgba(23, 162, 184, 0.5)",
          borderColor: "rgba(23, 162, 184, 0.5)",
          tension: 0.4,
        },
        {
          label: "Curva C",
          data: dataset["curva_3"],
          borderWidth: 2,
          pointBackgroundColor: "rgba(0, 123, 255, 0.5)",
          borderColor: "rgba(0, 123, 255, 0.5)",
          tension: 0.4,
        },
        {
          label: "Sem Curva",
          data: dataset["curva_4"],
          borderWidth: 2,
          pointBackgroundColor: "rgba(108, 117, 125, 0.5)",
          borderColor: "rgba(108, 117, 125, 0.5)",
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
            maxTicksLimit: 30,
          },
        },
        y: {
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
          text: "Histórico de Disponibilidade (%)",
          align: "end",
          padding: { bottom: 15 },
          font: {
            weight: "bold",
            size: 12,
          },
        },
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            boxHeight: 10,
            useBorderRadius: true,
            borderRadius: 0,
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return `${context.dataset.label}: ${context.formattedValue}%`;
            },
          },
        },
      },
      animation: true,
    });
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setLoaded(true);
    }
  }, [data]);

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
