import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartContainer from "../../ChartContainer";

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
          position: "bottom",
        },
      },
      animation: {
        duration: 0,
      },
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
          <Doughnut data={data} options={options} />
        </ChartContainer>
      )}
    </>
  );
}

export default MontantesPorCurva;
