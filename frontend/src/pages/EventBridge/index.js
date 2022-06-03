import React, { useState, useEffect } from "react";

import { Bar } from "react-chartjs-2";
import "chartjs-adapter-moment";

import Background from "../../components/Binx/Background";
import Menu from "../../components/Binx/Menu";
import PageWrapper from "../../components/Binx/PageWrapper";
import Page from "../../components/Binx/Page";

import ChartContainer from "../../components/ChartContainer";

function EventBridge(props) {
  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const [loaded, setLoaded] = useState();

  useEffect(() => {
    const labels = ["A", "B"];

    setData({
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: [
            {
              x: ["2022-01-01 05:00:00", "2022-01-01 08:00:00"],
              y: 1,
            },
            {
              x: "2022-01-01 14:00:00",
              y: 1,
            },
          ],
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgb(255, 99, 132)"],
          borderWidth: 1,
        },
      ],
    });
    setOptions({
      scales: {
        x: {
          stacked: true,
          type: "time",
          time: {
            displayFormats: {
              hour: "HH:mm",
            },
            tooltipFormat: "HH:mm",
          },
          min: "2022-01-01 00:00:00",
          max: "2022-01-01 23:59:59",
        },
        y: {
          stacked: true,
        },
      },
      indexAxis: "y",
    });

    setLoaded(true);
  }, []);

  return (
    <Background>
      <Menu logged={true} />
      <PageWrapper>
        <Page>
          {loaded && (
            <ChartContainer>
              <Bar data={data} options={options} />
            </ChartContainer>
          )}
        </Page>
      </PageWrapper>
    </Background>
  );
}

export default EventBridge;
