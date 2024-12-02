import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { LedEffect } from './ui/LedEffect';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: Record<string, number>;
}

const CHART_COLORS = {
  backgroundColor: [
    'rgba(0, 255, 242, 0.5)',
    'rgba(0, 163, 255, 0.5)',
    'rgba(0, 255, 157, 0.5)',
    'rgba(157, 0, 255, 0.5)',
    'rgba(255, 0, 242, 0.5)',
    'rgba(255, 157, 0, 0.5)',
  ],
  borderColor: [
    'rgba(0, 255, 242, 1)',
    'rgba(0, 163, 255, 1)',
    'rgba(0, 255, 157, 1)',
    'rgba(157, 0, 255, 1)',
    'rgba(255, 0, 242, 1)',
    'rgba(255, 157, 0, 1)',
  ],
};

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: CHART_COLORS.backgroundColor,
        borderColor: CHART_COLORS.borderColor,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#fff',
          font: {
            size: 14,
          },
          generateLabels: (chart: any) => {
            const data = chart.data;
            return data.labels.map((label: string, index: number) => ({
              text: `${label} (${data.datasets[0].data[index]})`,
              fillStyle: data.datasets[0].backgroundColor[index],
              strokeStyle: data.datasets[0].borderColor[index],
              lineWidth: 2,
              hidden: false,
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-cyan-400/30 transition-all group">
      <LedEffect color="#00fff2" className="opacity-5 group-hover:opacity-20" />
      <h3 className="text-xl font-semibold mb-4 text-white">Distribuzione Paper per Categoria</h3>
      <div className="h-[300px]">
        <Pie data={chartData} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {Object.entries(data).map(([category, count]) => (
          <div key={category} className="flex items-center justify-between p-2 bg-gray-800 rounded">
            <span className="text-gray-300">{category}</span>
            <span className="text-cyan-400 font-semibold">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};