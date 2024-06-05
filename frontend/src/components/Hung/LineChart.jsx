import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  useEffect(() => {
    const ctx = document.getElementById('myLineChart').getContext('2d');
    const existingChart = Chart.getChart(ctx);

    if (existingChart) {
      existingChart.destroy();
    }
    const chartData = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Earnings',
            fill: false,
            data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000],
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            borderColor: 'rgba(78, 115, 223, 1)',
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            fontStyle: 'normal',
          },
        },
        title: {
          fontStyle: 'normal',
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgb(234, 236, 244)',
                zeroLineColor: 'rgb(234, 236, 244)',
                drawBorder: false,
                drawTicks: false,
                borderDash: [2],
                zeroLineBorderDash: [2],
                drawOnChartArea: false,
              },
              ticks: {
                fontColor: '#858796',
                fontStyle: 'normal',
                padding: 20,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: 'rgb(234, 236, 244)',
                zeroLineColor: 'rgb(234, 236, 244)',
                drawBorder: false,
                drawTicks: false,
                borderDash: [2],
                zeroLineBorderDash: [2],
              },
              ticks: {
                fontColor: '#858796',
                fontStyle: 'normal',
                padding: 20,
              },
            },
          ],
        },
      },
    };

    new Chart(ctx, chartData);
  }, []);

  return <canvas id="myLineChart" />;
};

export default LineChart;
