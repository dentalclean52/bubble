'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

type Pedido = {
  data_pedido: string;
  total_pedido: number;
};

export default function GraficoVendas({ pedidos }: { pedidos: Pedido[] }) {
  const agrupadoPorMes: { [key: string]: number } = {};

  pedidos.forEach((pedido) => {
    if (pedido.data_pedido) {
      const data = new Date(pedido.data_pedido);
      const chave = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`; // Ex: 2025-04
      agrupadoPorMes[chave] = (agrupadoPorMes[chave] || 0) + (pedido.total_pedido || 0);
    }
  });

  // Ordena as chaves corretamente (por data real)
  const chavesOrdenadas = Object.keys(agrupadoPorMes).sort();

  // Converte para labels legíveis
  const labels = chavesOrdenadas.map((chave) => {
    const [ano, mes] = chave.split('-');
    return new Date(`${ano}-${mes}-01`).toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    });
  });

  const valores = chavesOrdenadas.map((chave) => agrupadoPorMes[chave]);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Vendas (R$)',
        data: valores,
        borderColor: '#f87171',
        backgroundColor: '#fecaca',
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#f87171',
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
          callback: function (value: string | number) {
            if (typeof value === 'number') {
              return `R$ ${value.toFixed(2)}`;
            }
            return `R$ ${value}`;
          },
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
      <h2 className="text-xl font-bold mb-4">Vendas por Mês</h2>
      <Line options={options} data={data} />
    </div>
  );
}