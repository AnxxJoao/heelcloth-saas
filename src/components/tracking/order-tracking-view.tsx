"use client";

import React, { useState, useEffect } from "react";
import {
  Shirt,
  Search,
  CheckCircle2,
  Clock,
  Package,
  Layers,
  Truck,
  MessageCircle,
  AlertCircle,
  Calendar,
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface Jogador {
  id: string;
  playerIndex: number;
  name: string;
  number: string;
  size: string;
  model: string;
  shortSize?: string | null;
  notes?: string | null;
}

interface Item {
  id: string;
  product: string;
  quantity: number;
  size?: string | null;
  model?: string | null;
}

interface DadosRastreio {
  id: string;
  orderNumber: string;
  status: string;
  etapaNumero: number;
  subEtapaFabril?: string | null;
  statusEtapaProducao?: string | null;
  clienteNome: string;
  createdAt: string;
  prazoEntrega?: string | null;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  statusPagamento: "PAGO" | "PARCIAL" | "PENDENTE";
  totalPecas: number;
  qualidadeAprovada: boolean;
  itens: Item[];
  jogadores: Jogador[];
}

export function OrderTrackingView({ codigoInicial = "" }: { codigoInicial?: string }) {
  const [codigo, setCodigo] = useState(codigoInicial);
  const [buscaInput, setBuscaInput] = useState(codigoInicial);
  const [loading, setLoading] = useState(Boolean(codigoInicial));
  const [erro, setErro] = useState<string | null>(null);
  const [pedido, setPedido] = useState<DadosRastreio | null>(null);

  const consultarPedido = async (cod: string) => {
    if (!cod.trim()) return;
    setLoading(true);
    setErro(null);

    try {
      const res = await fetch(`/api/rastreio/${encodeURIComponent(cod.trim())}`);
      const data = await res.json();

      if (res.ok && data.sucesso) {
        setPedido(data.pedido);
        setCodigo(cod.trim());
      } else {
        setPedido(null);
        setErro(data.erro || "Pedido não encontrado. Verifique o número informado.");
      }
    } catch (err) {
      console.error("Erro ao buscar rastreamento:", err);
      setErro("Falha de conexão com os servidores Heelcloth. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (codigoInicial) {
      consultarPedido(codigoInicial);
    }
  }, [codigoInicial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    consultarPedido(buscaInput);
  };

  const formatarMoeda = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val || 0);
  };

  const formatarData = (dataStr?: string | null) => {
    if (!dataStr) return "A definir";
    return new Date(dataStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Etapas do Stepper Público (5 Fases)
  const etapas = [
    { numero: 1, titulo: "Orçamento Aprovado", desc: "Pedido confirmado e projeto inicializado" },
    {
      numero: 2,
      titulo: "Em Produção Fabril",
      desc: pedido?.subEtapaFabril ? `Fase: ${pedido.subEtapaFabril}` : "Corte, personalização e estamparia",
    },
    { numero: 3, titulo: "Controle de Qualidade", desc: "Inspeção de 7 itens e medidas" },
    { numero: 4, titulo: "Pronto para Envio", desc: "Embalado e pronto para transporte / retirada" },
    { numero: 5, titulo: "Entregue / Concluído", desc: "Uniformes recebidos com sucesso" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shirt className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-wider text-white">
                HEELCLOTH
              </span>
              <span className="text-[10px] block text-indigo-400 font-semibold tracking-widest uppercase">
                Sportswear Tracking
              </span>
            </div>
          </div>

          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600/30 transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Suporte WhatsApp
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
        {/* Search Bar Card */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm text-center max-w-2xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Rastreamento de Uniformes Esportivos
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
            Acompanhe em tempo real as etapas de confecção e confira a lista de jogadores do seu pedido.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={buscaInput}
                onChange={(e) => setBuscaInput(e.target.value)}
                placeholder="Ex: HC-2603-0001"
                className="w-full pl-10 pr-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !buscaInput.trim()}
              className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/30"
            >
              {loading ? "Buscando..." : "Rastrear"}
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-400">Consultando status do pedido...</p>
          </div>
        )}

        {/* Error State */}
        {erro && !loading && (
          <div className="p-6 bg-red-950/40 border border-red-800/50 rounded-2xl max-w-xl mx-auto text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <p className="text-sm font-semibold text-red-200">{erro}</p>
            <p className="text-xs text-red-400/80">
              Certifique-se de digitar o número exatamente como consta no comprovante (ex: HC-2603-0001).
            </p>
          </div>
        )}

        {/* Order Details Tracking */}
        {pedido && !loading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Header Card: Order Info */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    {pedido.orderNumber}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                      pedido.etapaNumero === 5
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : pedido.etapaNumero === 4
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                        : "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                    }`}
                  >
                    {pedido.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Cliente: <strong className="text-slate-200">{pedido.clienteNome}</strong> •{" "}
                  Data do Pedido: <strong className="text-slate-200">{formatarData(pedido.createdAt)}</strong>
                </p>
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="text-xs text-slate-400">Previsão de Entrega</p>
                  <p className="text-sm font-bold text-white flex items-center md:justify-end gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    {formatarData(pedido.prazoEntrega)}
                  </p>
                </div>

                <div className="text-left md:text-right pl-4 border-l border-slate-800">
                  <p className="text-xs text-slate-400">Total de Peças</p>
                  <p className="text-sm font-bold text-indigo-400 flex items-center md:justify-end gap-1 mt-0.5">
                    <Shirt className="w-3.5 h-3.5" />
                    {pedido.totalPecas} un
                  </p>
                </div>
              </div>
            </div>

            {/* Stepper Visual (5 Fases) */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                Linha do Tempo de Produção
              </h3>

              <div className="relative">
                {/* Linha de conexão atrás dos passos */}
                <div className="hidden sm:block absolute top-1/2 left-6 right-6 h-1 bg-slate-800 -translate-y-1/2 z-0" />

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                  {etapas.map((etapa) => {
                    const isConcluido = pedido.etapaNumero > etapa.numero;
                    const isAtual = pedido.etapaNumero === etapa.numero;

                    return (
                      <div
                        key={etapa.numero}
                        className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2"
                      >
                        {/* Círculo do Ícone */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition shadow-lg ${
                            isConcluido
                              ? "bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20"
                              : isAtual
                              ? "bg-indigo-600 text-white ring-4 ring-indigo-500/30 animate-pulse"
                              : "bg-slate-800 text-slate-500 border border-slate-700"
                          }`}
                        >
                          {isConcluido ? (
                            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                          ) : (
                            <span>{etapa.numero}</span>
                          )}
                        </div>

                        <div>
                          <p
                            className={`text-xs font-bold ${
                              isAtual
                                ? "text-indigo-400"
                                : isConcluido
                                ? "text-emerald-400"
                                : "text-slate-400"
                            }`}
                          >
                            {etapa.titulo}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {etapa.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sub-etapa industrial ativa */}
              {pedido.subEtapaFabril && pedido.etapaNumero === 2 && (
                <div className="mt-8 p-4 bg-indigo-950/40 border border-indigo-800/40 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 bg-indigo-600/30 text-indigo-400 rounded-lg">
                      <Layers className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs text-indigo-300 font-semibold">
                        Fase Ativa na Fábrica:
                      </p>
                      <p className="text-sm font-bold text-white">
                        {pedido.subEtapaFabril}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded bg-indigo-600/20 text-indigo-300 font-medium">
                    {pedido.statusEtapaProducao || "EM ANDAMENTO"}
                  </span>
                </div>
              )}
            </div>

            {/* Tabela de Jogadores e Camisas (Conferência do Cliente) */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Conferência de Nomes e Números ({pedido.jogadores.length} peças)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Verifique se os dados que serão estampados nas camisas estão corretos.
                  </p>
                </div>
                <span className="text-[11px] text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                  {pedido.qualidadeAprovada ? "✅ Aprovado no CQ" : "🔍 Em conferência"}
                </span>
              </div>

              {pedido.jogadores.length > 0 ? (
                <div className="border border-slate-800 rounded-xl overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="px-3 py-2.5 w-12 text-center">#</th>
                        <th className="px-4 py-2.5">Nome na Camisa</th>
                        <th className="px-3 py-2.5 text-center w-16">Número</th>
                        <th className="px-3 py-2.5 text-center w-20">Tam. Camisa</th>
                        <th className="px-3 py-2.5 text-center w-20">Tam. Short</th>
                        <th className="px-4 py-2.5">Modelo</th>
                        <th className="px-4 py-2.5">Observações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 bg-slate-950">
                      {pedido.jogadores.map((jogador) => (
                        <tr key={jogador.id} className="hover:bg-slate-900/50">
                          <td className="px-3 py-2 text-center text-slate-500 font-mono">
                            {jogador.playerIndex}
                          </td>
                          <td className="px-4 py-2 font-bold text-white">
                            {jogador.name}
                          </td>
                          <td className="px-3 py-2 text-center">
                            <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono font-bold border border-indigo-800/50">
                              {jogador.number}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-center font-semibold text-slate-200">
                            {jogador.size}
                          </td>
                          <td className="px-3 py-2 text-center text-slate-400">
                            {jogador.shortSize || "-"}
                          </td>
                          <td className="px-4 py-2 text-slate-300">
                            {jogador.model || "PADRÃO"}
                          </td>
                          <td className="px-4 py-2 text-slate-500 italic text-[11px]">
                            {jogador.notes || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 bg-slate-900 rounded-xl text-center text-xs text-slate-400">
                  Este pedido contém itens de confecção padronizados sem lista de nomes individuais.
                </div>
              )}
            </div>

            {/* Resumo Financeiro & Contato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Financeiro */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-indigo-400" />
                    Situação Financeira
                  </h3>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      pedido.statusPagamento === "PAGO"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : pedido.statusPagamento === "PARCIAL"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {pedido.statusPagamento === "PAGO"
                      ? "100% PAGO"
                      : pedido.statusPagamento === "PARCIAL"
                      ? "SINAL PAGO"
                      : "PAGAMENTO PENDENTE"}
                  </span>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Valor Total do Pedido:</span>
                    <strong className="text-white">{formatarMoeda(pedido.totalAmount)}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Valor Pago / Sinal:</span>
                    <strong>{formatarMoeda(pedido.paidAmount)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-200 pt-2 border-t border-slate-800 font-bold">
                    <span>Saldo Restante na Entrega:</span>
                    <span className={pedido.pendingAmount > 0 ? "text-amber-400" : "text-emerald-400"}>
                      {formatarMoeda(pedido.pendingAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Suporte & WhatsApp */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    Dúvidas ou Alterações?
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Precisa alterar algum número antes da sublimação ou tem dúvidas sobre a entrega?
                    Converse diretamente com o atendente da Heelcloth responsável pelo seu pedido.
                  </p>
                </div>

                <a
                  href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                    `Olá! Estou acompanhando meu pedido ${pedido.orderNumber} e gostaria de tirar uma dúvida.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar no WhatsApp sobre o Pedido {pedido.orderNumber}
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Heelcloth Sportswear. Tecnologia industrial de confecção esportiva sob medida.</p>
      </footer>
    </div>
  );
}
