import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = () => {
  useEffect(() => {
    const ctx = document.getElementById('myDoughnutChart').getContext('2d');
    const existingChart = Chart.getChart(ctx);

  if (existingChart) {
    existingChart.destroy();
  }
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            borderColor: ['#ffffff', '#ffffff', '#ffffff'],
            data: [50, 30, 15],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    });
  }, []);

  return <canvas id="myDoughnutChart" />;
};

export default DoughnutChart;
