'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Pedido = {
  data_pedido: string;
  total_pedido: number;
};

export default function GraficoVendasAno({ pedidos }: { pedidos: Pedido[] }) {
  const vendasPorAno: { [key: string]: number } = {};

  pedidos.forEach((pedido) => {
    if (pedido.data_pedido) {
      const ano = new Date(pedido.data_pedido).getFullYear().toString();
      vendasPorAno[ano] = (vendasPorAno[ano] || 0) + (pedido.total_pedido || 0);
    }
  });

  const anosOrdenados = Object.keys(vendasPorAno).sort();

  const data = {
    labels: anosOrdenados,
    datasets: [
      {
        label: 'Vendas por Ano (R$)',
        data: anosOrdenados.map((ano) => vendasPorAno[ano]),
        backgroundColor: '#ef4444', // Vermelho forte
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: number) => `R$ ${value}`,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Vendas por Ano</h2>
      <Bar options={options} data={data} />
    </div>
  );
}