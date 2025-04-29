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
      const mes = new Date(pedido.data_pedido).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
      agrupadoPorMes[mes] = (agrupadoPorMes[mes] || 0) + (pedido.total_pedido || 0);
    }
  });

  const mesesOrdenados = Object.keys(agrupadoPorMes).sort((a, b) => {
    const [mesA, anoA] = a.split('/');
    const [mesB, anoB] = b.split('/');
    return new Date(`${anoA}-${mesA}-01`).getTime() - new Date(`${anoB}-${mesB}-01`).getTime();
  });

  const data = {
    labels: mesesOrdenados,
    datasets: [
      {
        fill: true,
        label: 'Vendas (R$)',
        data: mesesOrdenados.map((mes) => agrupadoPorMes[mes]),
        borderColor: '#f87171', // Vermelho suave
        backgroundColor: '#fecaca', // Fundo preenchido vermelho claro
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
          callback: function(value: string | number) {
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