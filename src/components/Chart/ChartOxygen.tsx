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
    labels: data.predicted.oxygen.map((_, index) => `Point ${index + 1}`),
    datasets: [
      {
        label: 'Predicted Oxygen',
        data: data.predicted.oxygen,
        borderColor: 'rgba(196, 181, 253, 1)',
        backgroundColor: 'rgba(196, 181, 253, 0.3)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartAcidicity;
