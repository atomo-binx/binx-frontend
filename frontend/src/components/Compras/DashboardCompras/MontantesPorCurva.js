import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
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
          data: pMontantes,
          backgroundColor: ["#198754", "#00ADF1", "#086EB6", "#858585"],
          // borderWidth: 0,
        },
      ],
    });
    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            usePointStyle: true,
            boxWidth: 4,
            boxHeight: 8,
          },
        },
        labels: {
          display: true,
        },
        datalabels: {
          display: true,
          anchor: "start",
          offset: 2,
          align: "start",
          color: "#666",
          font: {
            weight: "bold",
            size: 10,
          },
          formatter: (value) => {
            return String(value + "%").replace(".", ",");
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return (
                context.label +
                ": " +
                context.formattedValue.replace(".", ",") +
                "%"
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
          <Doughnut plugins={[ChartDataLabels]} data={data} options={options} />
        </ChartContainer>
      )}
    </>
  );
}

export default MontantesPorCurva;
