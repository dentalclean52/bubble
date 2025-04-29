type Item = {
    COD: string;
    QUANT: number;
    PRECO: number;
  };
  
  type Pedido = {
    id: number;
    total_pedido: number;
    itens: Item[];
  };
  
  export default function ResumoCards({ pedidos }: { pedidos: Pedido[] }) {
    const quantidadePedidos = pedidos.length;
    const valorTotal = pedidos.reduce((sum, p) => sum + (p.total_pedido || 0), 0);
  
    const quantidadeItens = pedidos.reduce((total, pedido) => {
      if (pedido.itens && Array.isArray(pedido.itens)) {
        return total + pedido.itens.reduce((sum, item) => sum + (item.QUANT || 0), 0);
      }
      return total;
    }, 0);
  
    const ticketMedio = quantidadePedidos > 0 ? valorTotal / quantidadePedidos : 0;
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card title="Pedidos" value={quantidadePedidos.toString()} />
        <Card title="Itens Vendidos" value={quantidadeItens.toString()} />
        <Card title="Valor Total (R$)" value={valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} />
        <Card title="Ticket Médio (R$)" value={ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} />  
      </div>
    );
  }
  
  function Card({ title, value }: { title: string; value: string }) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  }