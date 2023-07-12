"use client";
import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import CountUp from "react-countup";
import Chart from "chart.js/auto";
import last from "lodash/last";

interface Props {
  data: Array<number>;
  xSpeed: number;
}

function AnimatedChart({ data, xSpeed }: Props) {
  const pointColors: Array<string> = [];
  const [lastMultiplier, setLastMultiplier] = useState(0);

  useEffect(() => {
    setLastMultiplier(last(data) ?? 0);

    for (let i = 0; i < data.length; i++) {
      if (i === data.length - 1) {
        pointColors[i] = "#ffb500";
      } else {
        pointColors[i] = "transparent";
      }
    }

    const chart = new Chart(
      document.getElementById("chart") as any,
      {
        type: "line",
        data: {
          labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          datasets: [
            {
              label: "Data",
              data: data,
              backgroundColor: "rgba(255, 51, 98, 0.2)",
              borderColor: "rgba(255, 51, 98, 1)",
              pointBackgroundColor: pointColors,
              pointBorderColor: pointColors,
              pointRadius: 10,
              borderWidth: 5,
              fill: false,
              showLine: true,

              cubicInterpolationMode: "monotone",
            },
          ],
        },
        options: {
          plugins: {
            legend: false,
          } as any,
          scales: {
            x: {
              type: "linear",
              display: true,
              beginAtZero: true,
              grid: {
                display: false, // Hide the x-axis gridlines
              },
              ticks: {
                callback: (value: any, index: any, values: any) => {
                  return Number(value.toString());
                },
              },
            },
            y: {
              // type: 'linear',
              display: false,

              grid: {
                display: false, // Hide the x-axis gridlines
              },
              ticks: {
                callback: (value: any, index: any, values: any) => {
                  return Number(value.toString());
                },
              },
            },
          },
          animation: {
            duration: 2000 / xSpeed,
            easing: "linear",
          },
        },
      } as any,
    );

    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <Card className={"col-span-3 w-12/12"}>
      <div className="relative">
        <canvas id="chart"></canvas>

        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CountUp
            className="text-4xl text-white font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text"
            start={0.0}
            end={lastMultiplier}
            decimals={2}
            duration={2 / xSpeed}
            suffix="x"
          />
        </div>
      </div>
    </Card>
  );
}

export default React.memo(AnimatedChart);
