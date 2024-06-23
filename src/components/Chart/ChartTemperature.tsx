// components/Chart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: {
    predicted: {
      acidity: number[];
      oxygen: number[];
      salinity: number[];
      temperature: number[];
    };
  };
}

const ChartAcidicity: React.FC<ChartProps> = ({ data }) => {
  const chartData = {
    labels: data.predicted.temperature.map((_, index) => `Point ${index + 1}`),
    datasets: [
      {
        label: 'Predicted Temperature',
        data: data.predicted.temperature,
        borderColor: 'rgba(255, 165, 0, 1)',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartAcidicity;
