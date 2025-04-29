'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import FiltroPedidos from '@/components/FiltroPedidos';
import ResumoCards from '@/components/ResumoCards';
import RelatorioTable from '@/components/RelatorioTable';
import GraficoVendas from '@/components/GraficoVendas';
import GraficoVendasAno from '@/components/GraficoVendasAno';
import GraficoObservacoes from '@/components/GraficoObservacoes';
import SkeletonLoader from '@/components/SkeletonLoader';
import Image from 'next/image';

type Item = {
  COD: string;
  QUANT: number;
  PRECO: number;
};

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
  itens: Item[];
};

export default function Relatorio() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    dataInicial: '',
    dataFinal: '',
    estado: '',
    observacao: '',
  });

  useEffect(() => {
    if (!sessionStorage.getItem('auth')) {
      router.push('/login');
    } else {
      const fetchPedidos = async () => {
        setLoading(true);

        let query = supabase
          .from('pedidos')
          .select('*')
          .eq('enviado_email', true)
          .order('data_pedido', { ascending: false });

        if (filtros.dataInicial) {
          query = query.gte('data_pedido', filtros.dataInicial);
        }
        if (filtros.dataFinal) {
          query = query.lte('data_pedido', filtros.dataFinal);
        }
        if (filtros.estado) {
          query = query.eq('estado', filtros.estado);
        }
        if (filtros.observacao) {
          query = query.ilike('observacao', `%${filtros.observacao}%`);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Erro ao buscar pedidos:', error);
        } else if (data) {
          const parsedData = data.map(pedido => ({
            ...pedido,
            itens: typeof pedido.itens === 'string' ? JSON.parse(pedido.itens) : pedido.itens
          }));
          setPedidos(parsedData as Pedido[]);
        }
        setLoading(false);
      };

      fetchPedidos();
    }
  }, [router, filtros]);

  const handleFilterChange = (filtrosAtualizados: { dataInicial: string; dataFinal: string; estado: string; observacao: string }) => {
    setFiltros(filtrosAtualizados);
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <Image src="/logo-web.svg" alt="Logo" width={250} height={50} />
      </div>

      {/* Título */}
      <h1 className="text-3xl font-bold mb-8">Relatório de Pedidos</h1>

      {/* Cards */}
      <ResumoCards pedidos={pedidos} />

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <GraficoVendas pedidos={pedidos} />
        <GraficoVendasAno pedidos={pedidos} />
        <GraficoObservacoes pedidos={pedidos} />
      </div>

      {/* Filtros */}
      <FiltroPedidos onFilterChange={handleFilterChange} />

      {/* Resumo dos Filtros Ativos */}
      {(filtros.dataInicial || filtros.dataFinal || filtros.estado || filtros.observacao) && (
        <div className="bg-white rounded-lg shadow p-4 mb-8 flex flex-wrap gap-4 text-sm text-gray-700">
          {filtros.dataInicial && (
            <div className="px-3 py-1 bg-gray-100 rounded-full">
              <strong>Data Inicial:</strong> {new Date(filtros.dataInicial).toLocaleDateString()}
            </div>
          )}
          {filtros.dataFinal && (
            <div className="px-3 py-1 bg-gray-100 rounded-full">
              <strong>Data Final:</strong> {new Date(filtros.dataFinal).toLocaleDateString()}
            </div>
          )}
          {filtros.estado && (
            <div className="px-3 py-1 bg-gray-100 rounded-full">
              <strong>Estado:</strong> {filtros.estado}
            </div>
          )}
          {filtros.observacao && (
            <div className="px-3 py-1 bg-gray-100 rounded-full">
              <strong>Observação:</strong> {filtros.observacao}
            </div>
          )}
        </div>
      )}

      {/* Tabela */}
      {pedidos.length > 0 ? (
        <RelatorioTable pedidos={pedidos} />
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          Nenhum pedido encontrado para os filtros selecionados.
        </div>
      )}
    </div>
  );
}