'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Pedido = {
  observacao: string;
};

export default function GraficoObservacoes({ pedidos }: { pedidos: Pedido[] }) {
  let revendedora = 0;
  let outros = 0;

  pedidos.forEach((pedido) => {
    const obs = (pedido.observacao || '').toUpperCase();
    if (obs.includes('REVENDEDOR')) {
      revendedora++;
    } else {
      outros++;
    }
  });

  const data = {
    labels: ['Revenda', 'Ecommerce'],
    datasets: [
      {
        data: [revendedora, outros],
        backgroundColor: ['#dc2626', '#fca5a5'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 4,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '50%',
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ddd',
        borderWidth: 1,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Revenda vc Ecommerce</h2>
      <div className="w-full h-[250px] flex justify-center items-center">
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
}