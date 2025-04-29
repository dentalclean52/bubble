'use client';

import { useState } from 'react';

type Filtros = {
  dataInicial: string;
  dataFinal: string;
  estado: string;
  observacao: string;
};

export default function FiltroPedidos({ onFilterChange }: { onFilterChange: (filtros: Filtros) => void }) {
  const [localFiltros, setLocalFiltros] = useState<Filtros>({
    dataInicial: '',
    dataFinal: '',
    estado: '',
    observacao: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const aplicarFiltros = () => {
    // Chama usando o localFiltros que já está atualizado
    onFilterChange(localFiltros);
  };

  const limparFiltros = () => {
    const filtrosVazios = {
      dataInicial: '',
      dataFinal: '',
      estado: '',
      observacao: '',
    };
    setLocalFiltros(filtrosVazios);
    onFilterChange(filtrosVazios);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="flex flex-col">
          <label htmlFor="dataInicial" className="text-sm font-medium mb-1">Data Inicial</label>
          <input
            type="date"
            id="dataInicial"
            name="dataInicial"
            value={localFiltros.dataInicial}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dataFinal" className="text-sm font-medium mb-1">Data Final</label>
          <input
            type="date"
            id="dataFinal"
            name="dataFinal"
            value={localFiltros.dataFinal}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="estado" className="text-sm font-medium mb-1">Estado</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={localFiltros.estado}
            onChange={handleChange}
            placeholder="UF"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="observacao" className="text-sm font-medium mb-1">Observação</label>
          <input
            type="text"
            id="observacao"
            name="observacao"
            value={localFiltros.observacao}
            onChange={handleChange}
            placeholder="Ex: Revendedora"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={aplicarFiltros}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            Aplicar
          </button>
          <button
            onClick={limparFiltros}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-lg w-full"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}