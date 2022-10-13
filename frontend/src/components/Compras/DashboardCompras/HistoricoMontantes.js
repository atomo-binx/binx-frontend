import React, { useState, useEffect } from "react";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import ChartContainer from "../../ChartContainer";
import dayjs from "dayjs";
import { BRLString } from "../../../util/money";
import currency from "currency.js";

function HistoricoMontantes({ historicoMontantes }) {
  const [data, setData] = useState({});
  const [options, setOptions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  function montarDatasets(dados) {
    let datasets = [];

    // Levantamento dos nomes das propriedades
    for (const chave in dados[0]) {
      if (chave === "data") continue;

      const structuredData = dados.map((dado) => {
        return {
          x: dayjs(dado.data.replace("Z", "")).startOf("day").toDate(),
          y: dado[chave],
        };
      });

      datasets.push({
        label: chave,
        data: structuredData,
      });
    }

    console.log(datasets);

    return datasets;
  }

  function adquirirDatas(dados) {
    return dados.map((dado) =>
      dayjs(dado.data.replace("Z", "")).startOf("day").toDate()
    );
  }

  useEffect(() => {
    const datasets = montarDatasets(historicoMontantes);

    const maxDate = new Date(Math.max(...adquirirDatas(historicoMontantes)));
    const minDate = new Date(Math.min(...adquirirDatas(historicoMontantes)));

    setData({
      datasets: [
        {
          label: "Geral",
          data: datasets[0].data,
          borderColor: "rgba(255, 193, 7, 0.6)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(255, 193, 7, 0.6)",
          tension: 0.4,
        },
        {
          label: "Curva A",
          data: datasets[1].data,
          borderColor: "rgba(40, 167, 69, 0.6)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(40, 167, 69, 0.6)",
          tension: 0.4,
        },
        {
          label: "Curva B",
          data: datasets[2].data,
          borderColor: "rgba(23, 162, 184, 0.6)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(23, 162, 184, 0.6)",
          tension: 0.4,
        },
        {
          label: "Curva C",
          data: datasets[3].data,
          borderColor: "rgba(0, 123, 255, 0.6)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(0, 123, 255, 0.6)",
          tension: 0.4,
        },
        {
          label: "Sem Curva",
          data: datasets[4].data,
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
          type: "time",
          time: {
            unit: "day",
            displayFormats: {
              day: "dd/MM",
            },
            tooltipFormat: "dd/MM",
          },
          min: minDate,
          max: maxDate,
        },
        y: {
          ticks: {
            callback: function (value) {
              return "R$" + parseInt(value / 1000) + "K";
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
          position: "bottom",
          labels: {
            usePointStyle: true,
            boxHeight: 6,
          },
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
              const label = context.dataset.label;

              const valor = parseInt(
                context.formattedValue
                  .replace(/\s/g, ".")
                  .replace(".", "")
                  .replace(",", ".") / 1000
              );

              let relativo = null;

              switch (context.dataset.label) {
                case "Curva A":
                  relativo = parseFloat(datasets[5].data[context.dataIndex].y)
                    .toFixed(1)
                    .replace(".", ",");
                  break;
                case "Curva B":
                  relativo = parseFloat(datasets[6].data[context.dataIndex].y)
                    .toFixed(1)
                    .replace(".", ",");
                  break;
                case "Curva C":
                  relativo = parseFloat(datasets[7].data[context.dataIndex].y)
                    .toFixed(1)
                    .replace(".", ",");
                  break;
                case "Sem Curva":
                  relativo = parseFloat(datasets[8].data[context.dataIndex].y)
                    .toFixed(1)
                    .replace(".", ",");
                  break;
              }

              return `${label}: R$ ${valor}K ${
                relativo ? `(${relativo}%)` : ""
              }`;
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
