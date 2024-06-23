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
    labels: data.predicted.salinity.map((_, index) => `Point ${index + 1}`),
    datasets: [
      {
        label: 'Predicted Salinity',
        data: data.predicted.salinity,
        borderColor: 'rgba(0, 255, 0, 1)',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartAcidicity;
