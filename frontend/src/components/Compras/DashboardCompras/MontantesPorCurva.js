import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ChartContainer from "../../ChartContainer";
import ChartDataLabels from "chartjs-plugin-datalabels";

function MontantesPorCurva({ pMontantes }) {
  const [data, setData] = useState({});
  const [options, setOptions] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setData({
      labels: ["Curva A", "Curva B", "Curva C", "Sem Curva"],
      datasets: [
        {
          type: "bar",
          label: "Disponibilidade",
          labels: ["Curva", "Curva B", "Curva C", "Sem Curva"],
          data: pMontantes,
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

        datalabels: {
          display: true,
          anchor: "end",
          align: "top",
          formatter: (value) => {
            return "R$ " + parseInt(value / 1000) + "K";
          },
          font: {
            weight: "bold",
          },
        },

        tooltip: {
          callbacks: {
            label: (context) => {
              return (
                context.label +
                ": R$ " +
                parseInt(context.formattedValue.replace(".", ",")) +
                "K"
              );
            },
          },
        },
      },
      animation: false,
      cutout: "65%",
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
          <Bar plugins={[ChartDataLabels]} data={data} options={options} />
        </ChartContainer>
      )}
    </>
  );
}

export default MontantesPorCurva;
