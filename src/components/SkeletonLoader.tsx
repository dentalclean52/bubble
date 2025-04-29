'use client';

export default function SkeletonLoader() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen animate-pulse">
      {/* Título */}
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-300 rounded-lg"></div>
        ))}
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-300 rounded-lg"></div>
        ))}
        <div className="h-12 bg-gray-400 rounded-lg"></div> {/* Botão limpar */}
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div> {/* Título da tabela */}
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}