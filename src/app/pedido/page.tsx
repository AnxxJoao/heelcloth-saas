"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shirt,
  Plus,
  Trash2,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  Search,
  MessageCircle,
  Sparkles,
} from "lucide-react";

interface LinhaUniforme {
  id: string;
  nome: string;
  numero: string;
  tamCamisa: string;
  tamShort: string;
  goleiro: boolean;
  mangaLonga: boolean;
  texturizada: boolean;
  punhos: boolean;
  obs: string;
}

export default function FazerPedidoPage() {
  const router = useRouter();

  // Dados do Cliente
  const [representante, setRepresentante] = useState("");
  const [contato, setContato] = useState("");

  // Cria 10 jogadores iniciais (mínimo exigido pela confecção)
  const [linhas, setLinhas] = useState<LinhaUniforme[]>(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: `linha-${i + 1}`,
      nome: "",
      numero: (i + 1).toString(),
      tamCamisa: "M",
      tamShort: "",
      goleiro: i === 0, // Primeiro jogador como goleiro por padrão
      mangaLonga: false,
      texturizada: false,
      punhos: false,
      obs: "",
    }))
  );

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [protocoloGerado, setProtocoloGerado] = useState<string | null>(null);

  // Adicionar nova linha de jogador
  const adicionarLinha = () => {
    const proximoNum = linhas.length + 1;
    setLinhas((prev) => [
      ...prev,
      {
        id: `linha-${Date.now()}-${proximoNum}`,
        nome: "",
        numero: proximoNum.toString(),
        tamCamisa: "M",
        tamShort: "",
        goleiro: false,
        mangaLonga: false,
        texturizada: false,
        punhos: false,
        obs: "",
      },
    ]);
  };

  // Remover linha
  const removerLinha = (id: string) => {
    if (linhas.length <= 1) return;
    setLinhas((prev) => prev.filter((l) => l.id !== id));
  };

  // Atualizar campo específico de uma linha
  const atualizarLinha = (id: string, campo: keyof LinhaUniforme, valor: any) => {
    setLinhas((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [campo]: valor } : l))
    );
  };

  // Totais
  const totalCamisas = linhas.filter((l) => Boolean(l.tamCamisa)).length;
  const totalShorts = linhas.filter((l) => Boolean(l.tamShort)).length;

  // Estimativa de preço (valores de referência Heelcloth)
  const valorUnitarioCamisa = 49.9;
  const valorUnitarioShort = 29.9;
  const totalEstimado =
    totalCamisas * valorUnitarioCamisa + totalShorts * valorUnitarioShort;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (!representante.trim()) {
      setErro("Por favor, informe o nome do responsável ou time.");
      return;
    }

    const cleanContato = contato.replace(/\D/g, "");
    if (cleanContato.length < 10) {
      setErro("Informe um WhatsApp válido com DDD (mínimo 10 dígitos).");
      return;
    }

    if (totalCamisas < 10) {
      setErro(`O pedido mínimo para confecção é de 10 camisas. Atualmente há ${totalCamisas} selecionadas.`);
      return;
    }

    setEnviando(true);

    try {
      // Monta payload esperado por /api/enviar
      const payloadItens = linhas.map((l) => {
        const opcoes: string[] = [];
        if (l.mangaLonga) opcoes.push("manga_longa");
        if (l.texturizada) opcoes.push("texturizada");
        if (l.punhos) opcoes.push("punhos");

        return {
          nome: l.nome.trim(),
          numero: l.numero.trim(),
          tamCamisa: l.tamCamisa,
          tamShort: l.tamShort || "",
          goleiro: l.goleiro,
          opcoes,
          obs: l.obs.trim(),
        };
      });

      const res = await fetch("/api/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          representante: representante.trim(),
          contato: cleanContato,
          itens: payloadItens,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setProtocoloGerado(data.protocolo);
      } else {
        setErro(data.erro || "Falha ao processar o pedido. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro no envio:", err);
      setErro("Erro de comunicação com o servidor. Verifique sua conexão.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition">
              <Shirt className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider text-white">
                HEELCLOTH
              </span>
              <span className="text-[10px] block text-indigo-400 font-semibold uppercase tracking-widest">
                Sportswear
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/rastreio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800 hover:text-white transition"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              Já tem um pedido? Rastrear
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-6">
        {/* Banner de Sucesso pós-envio */}
        {protocoloGerado ? (
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-8 max-w-2xl mx-auto text-center space-y-5 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Pedido Enviado com Sucesso!
              </h1>
              <p className="text-sm text-slate-400 mt-1.5">
                Seu pedido foi registrado na fábrica. Guarde seu número de protocolo para acompanhar a produção:
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 inline-block">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Número do Pedido / Protocolo
              </p>
              <p className="text-2xl font-black text-indigo-400 font-mono mt-1">
                {protocoloGerado}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href={`/rastreio/${protocoloGerado}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-indigo-600/30"
              >
                <Search className="w-4 h-4" />
                Acompanhar no Rastreamento
              </Link>
              <a
                href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                  `Olá! Acabei de enviar o pedido ${protocoloGerado} pelo site e gostaria de confirmar.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-600/30"
              >
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Title Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Solicitar Orçamento & Pedido de Uniformes
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Monte a lista com nomes, números e tamanhos das camisas. Mínimo de 10 unidades.
                </p>
              </div>

              {/* Status do Pedido Mínimo */}
              <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-right">
                  <p className="text-[11px] text-slate-400">Total de Camisas:</p>
                  <p
                    className={`text-base font-bold ${
                      totalCamisas >= 10 ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {totalCamisas} / 10 mín.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400">
                  <Shirt className="w-5 h-5" />
                </div>
              </div>
            </div>

            {erro && (
              <div className="p-4 bg-red-950/40 border border-red-800/50 rounded-xl flex items-center gap-3 text-red-300 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                <span>{erro}</span>
              </div>
            )}

            {/* Seção 1: Dados do Cliente */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                1. Dados do Responsável / Time
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Nome do Responsável ou Equipe / Empresa: *
                  </label>
                  <input
                    type="text"
                    required
                    value={representante}
                    onChange={(e) => setRepresentante(e.target.value)}
                    placeholder="Ex: Carlos Silva ou Grêmio F.C."
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    WhatsApp com DDD (para envio da arte e notificações): *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contato}
                    onChange={(e) => setContato(e.target.value)}
                    placeholder="Ex: (11) 98765-4321"
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Seção 2: Tabela de Jogadores / Uniformes */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    2. Lista de Camisas e Uniformes ({linhas.length} itens)
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Preencha o nome nas costas, número e tamanhos de cada peça.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={adicionarLinha}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar Jogador
                </button>
              </div>

              {/* Tabela Responsiva */}
              <div className="border border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300 min-w-[700px]">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="px-2 py-2.5 w-10 text-center">#</th>
                      <th className="px-3 py-2.5">Nome nas Costas</th>
                      <th className="px-2 py-2.5 w-16 text-center">Nº</th>
                      <th className="px-2 py-2.5 w-24 text-center">Camisa</th>
                      <th className="px-2 py-2.5 w-24 text-center">Short</th>
                      <th className="px-3 py-2.5 w-20 text-center">Goleiro</th>
                      <th className="px-3 py-2.5">Opções / Acabamento</th>
                      <th className="px-2 py-2.5 w-10 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                    {linhas.map((linha, idx) => (
                      <tr key={linha.id} className="hover:bg-slate-850/50">
                        <td className="px-2 py-2 text-center text-slate-500 font-mono text-[11px]">
                          {idx + 1}
                        </td>

                        {/* Nome */}
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={linha.nome}
                            onChange={(e) =>
                              atualizarLinha(linha.id, "nome", e.target.value.toUpperCase())
                            }
                            placeholder="Ex: NEYMAR JR"
                            className="w-full px-2.5 py-1 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white uppercase placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </td>

                        {/* Número */}
                        <td className="px-2 py-2 text-center">
                          <input
                            type="text"
                            value={linha.numero}
                            onChange={(e) =>
                              atualizarLinha(linha.id, "numero", e.target.value)
                            }
                            placeholder="10"
                            className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded-lg text-center font-mono font-bold text-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </td>

                        {/* Tam. Camisa */}
                        <td className="px-2 py-2 text-center">
                          <select
                            value={linha.tamCamisa}
                            onChange={(e) =>
                              atualizarLinha(linha.id, "tamCamisa", e.target.value)
                            }
                            className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded-lg text-center font-semibold text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          >
                            <option value="">Nenhum</option>
                            <option value="PP">PP</option>
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                            <option value="XG">XG</option>
                          </select>
                        </td>

                        {/* Tam. Short */}
                        <td className="px-2 py-2 text-center">
                          <select
                            value={linha.tamShort}
                            onChange={(e) =>
                              atualizarLinha(linha.id, "tamShort", e.target.value)
                            }
                            className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded-lg text-center text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          >
                            <option value="">Sem calção</option>
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                          </select>
                        </td>

                        {/* Goleiro */}
                        <td className="px-3 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={linha.goleiro}
                            onChange={(e) =>
                              atualizarLinha(linha.id, "goleiro", e.target.checked)
                            }
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                        </td>

                        {/* Opções */}
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-400">
                            <label className="flex items-center gap-1 cursor-pointer hover:text-white">
                              <input
                                type="checkbox"
                                checked={linha.mangaLonga}
                                onChange={(e) =>
                                  atualizarLinha(linha.id, "mangaLonga", e.target.checked)
                                }
                                className="rounded text-indigo-600"
                              />
                              <span>Manga Longa</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer hover:text-white">
                              <input
                                type="checkbox"
                                checked={linha.punhos}
                                onChange={(e) =>
                                  atualizarLinha(linha.id, "punhos", e.target.checked)
                                }
                                className="rounded text-indigo-600"
                              />
                              <span>Punho</span>
                            </label>
                          </div>
                        </td>

                        {/* Remover */}
                        <td className="px-2 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => removerLinha(linha.id)}
                            disabled={linhas.length <= 1}
                            className="p-1 text-slate-500 hover:text-red-400 disabled:opacity-20 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[11px] text-slate-500">
                  Dica: Para encomendar goleiros ou mangas longas, marque as opções na linha correspondente.
                </span>

                <button
                  type="button"
                  onClick={adicionarLinha}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  +1 Jogador
                </button>
              </div>
            </div>

            {/* Seção 3: Resumo & Envio */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400">Estimativa do Orçamento:</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-white">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(totalEstimado)}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({totalCamisas} camisas {totalShorts > 0 ? `+ ${totalShorts} calções` : ""})
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  * Valores finais confirmados após aprovação do layout e arte digital.
                </p>
              </div>

              <button
                type="submit"
                disabled={enviando || totalCamisas < 10}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition shadow-xl shadow-indigo-600/30 disabled:opacity-50"
              >
                {enviando ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processando Pedido...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Pedido & Gerar Protocolo</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Heelcloth Sportswear. Sistema Integrado de Confecção Esportiva Sob Medida.</p>
      </footer>
    </div>
  );
}
