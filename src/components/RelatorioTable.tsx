'use client';

import { useState } from 'react';
import Papa from 'papaparse';

const ITENS_POR_PAGINA = 50;

type Pedido = {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  data_pedido: string;
  total_pedido: number;
  tel1: string;
  email: string;
  valor_frete: number;
  observacao: string;
  id_pedido: string;
};

export default function RelatorioTable({ pedidos }: { pedidos: Pedido[] }) {
  const [paginaAtual, setPaginaAtual] = useState(1);

  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        Nenhum pedido encontrado.
      </div>
    );
  }

  const totalPaginas = Math.ceil(pedidos.length / ITENS_POR_PAGINA);
  const indexInicial = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const pedidosPaginados = pedidos.slice(indexInicial, indexInicial + ITENS_POR_PAGINA);

  const irParaAnterior = () => {
    setPaginaAtual((prev) => Math.max(prev - 1, 1));
  };

  const irParaProxima = () => {
    setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas));
  };

  const exportarCSV = () => {
    const csv = (Papa as any).unparse(pedidosPaginados);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pedidos_pagina_${paginaAtual}.csv`);
    link.click();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Pedidos</h2>
        <button
          onClick={exportarCSV}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow"
        >
          Exportar Página
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4 text-left">Data</th>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-left">Cidade</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-left">Telefone</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-right">Frete</th>
              <th className="p-4 text-left">Observação</th>
              <th className="p-4 text-right">Total</th>
              
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {pedidosPaginados.map((pedido) => (
              <tr key={pedido.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">{new Date(pedido.data_pedido).toLocaleDateString()}</td>
                <td className="p-4">{pedido.id_pedido}</td>
                <td className="p-4">{pedido.nome}</td>
                <td className="p-4">{pedido.cidade}</td>
                <td className="p-4">{pedido.estado}</td>
                <td className="p-4">{pedido.tel1}</td>
                <td className="p-4">{pedido.email}</td>
                <td className="p-4 text-right">R$ {pedido.valor_frete?.toFixed(2)}</td>
                <td className="p-4">{pedido.observacao}</td>
                <td className="p-4 text-right font-semibold">R$ {pedido.total_pedido?.toFixed(2)}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={irParaAnterior}
          disabled={paginaAtual === 1}
          className={`px-4 py-2 rounded-lg font-bold ${
            paginaAtual === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          Anterior
        </button>

        <span className="text-gray-600 text-sm">
          Página {paginaAtual} de {totalPaginas}
        </span>

        <button
          onClick={irParaProxima}
          disabled={paginaAtual === totalPaginas}
          className={`px-4 py-2 rounded-lg font-bold ${
            paginaAtual === totalPaginas
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}