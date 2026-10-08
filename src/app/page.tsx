"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shirt,
  Search,
  ArrowRight,
  Menu,
  X,
  Lock,
  ChevronRight,
  Ruler,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);
  const [codigoRastreio, setCodigoRastreio] = useState("");
  const [abaMedidas, setAbaMedidas] = useState<"masculino" | "feminino" | "infantil">("masculino");

  const handleBuscarRastreio = (e: React.FormEvent) => {
    e.preventDefault();
    if (codigoRastreio.trim()) {
      router.push(`/rastreio?codigo=${encodeURIComponent(codigoRastreio.trim())}`);
    } else {
      router.push("/rastreio");
    }
  };

  const medidas = {
    masculino: [
      { tamanho: "P", largura: "50 cm", altura: "68 cm", indicacao: "Até 1,70m e 68kg" },
      { tamanho: "M", largura: "52 cm", altura: "71 cm", indicacao: "Até 1,78m e 78kg" },
      { tamanho: "G", largura: "55 cm", altura: "74 cm", indicacao: "Até 1,85m e 88kg" },
      { tamanho: "GG", largura: "58 cm", altura: "77 cm", indicacao: "Até 1,92m e 100kg" },
      { tamanho: "XGG", largura: "62 cm", altura: "80 cm", indicacao: "Acima de 100kg" },
    ],
    feminino: [
      { tamanho: "P", largura: "43 cm", altura: "60 cm", indicacao: "Manequim 36-38" },
      { tamanho: "M", largura: "46 cm", altura: "63 cm", indicacao: "Manequim 40" },
      { tamanho: "G", largura: "49 cm", altura: "66 cm", indicacao: "Manequim 42-44" },
      { tamanho: "GG", largura: "52 cm", altura: "69 cm", indicacao: "Manequim 46" },
    ],
    infantil: [
      { tamanho: "06", largura: "36 cm", altura: "48 cm", indicacao: "5 a 6 anos" },
      { tamanho: "08", largura: "39 cm", altura: "52 cm", indicacao: "7 a 8 anos" },
      { tamanho: "10", largura: "42 cm", altura: "56 cm", indicacao: "9 a 10 anos" },
      { tamanho: "12", largura: "44 cm", altura: "60 cm", indicacao: "11 a 12 anos" },
      { tamanho: "14", largura: "46 cm", altura: "64 cm", indicacao: "13 a 14 anos" },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col">
      {/* 1. Header Minimalista e Discreto */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Tipográfico Puro */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-slate-950">
              HEELCLOTH
            </span>
          </Link>

          {/* Navegação Principal */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#como-funciona" className="hover:text-slate-950 transition-colors">
              Como Funciona
            </a>
            <a href="#modalidades" className="hover:text-slate-950 transition-colors">
              Modalidades
            </a>
            <a href="#materiais" className="hover:text-slate-950 transition-colors">
              Materiais
            </a>
            <a href="#tabela-medidas" className="hover:text-slate-950 transition-colors">
              Tabela de Medidas
            </a>
            <Link href="/ajuda" className="hover:text-slate-950 transition-colors">
              Ajuda
            </Link>
          </nav>

          {/* Ações Diretas */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/rastreio"
              className="text-xs font-medium text-slate-600 hover:text-slate-950 transition-colors"
            >
              Já tenho um código
            </Link>
            <Link
              href="/pedido"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
            >
              Fazer Pedido
            </Link>
          </div>

          {/* Menu Mobile */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-950"
            aria-label="Abrir menu"
          >
            {menuAberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Gaveta Mobile */}
        {menuAberto && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3">
            <a
              href="#como-funciona"
              onClick={() => setMenuAberto(false)}
              className="block py-1.5 text-sm font-medium text-slate-700"
            >
              Como Funciona
            </a>
            <a
              href="#modalidades"
              onClick={() => setMenuAberto(false)}
              className="block py-1.5 text-sm font-medium text-slate-700"
            >
              Modalidades
            </a>
            <a
              href="#materiais"
              onClick={() => setMenuAberto(false)}
              className="block py-1.5 text-sm font-medium text-slate-700"
            >
              Materiais
            </a>
            <a
              href="#tabela-medidas"
              onClick={() => setMenuAberto(false)}
              className="block py-1.5 text-sm font-medium text-slate-700"
            >
              Tabela de Medidas
            </a>
            <Link
              href="/ajuda"
              onClick={() => setMenuAberto(false)}
              className="block py-1.5 text-sm font-medium text-slate-700"
            >
              Ajuda & Dúvidas
            </Link>
            <Link
              href="/rastreio"
              onClick={() => setMenuAberto(false)}
              className="block py-1.5 text-sm font-medium text-slate-700"
            >
              Acompanhar Pedido
            </Link>
            <div className="pt-2">
              <Link
                href="/pedido"
                onClick={() => setMenuAberto(false)}
                className="block w-full text-center py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-xs"
              >
                Fazer Pedido
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section Refinado */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Coluna Esquerda: Texto e Ações */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Confecção de Uniformes Esportivos
                </p>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
                  Camisas e uniformes personalizados feitos para o seu time.
                </h1>
                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                  Crie seu pedido de forma rápida, informe a lista de jogadores com nome, número e tamanho, e receba seu orçamento sob medida.
                </p>
              </div>

              {/* Botões de Conversão */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/pedido"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition"
                >
                  <span>Fazer meu pedido</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/rastreio"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-300 transition"
                >
                  Já fiz um pedido
                </Link>
              </div>

              {/* Linha Institucional Sóbria (Sem ícones decorativos ou checklists de IA) */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 font-medium">
                  Confecção própria · Sublimação digital de alta definição · Envio para todo o Brasil
                </p>
              </div>
            </div>

            {/* Coluna Direita: Apresentação Gráfica Limpa do Uniforme */}
            <div className="lg:col-span-5">
              <div className="border border-slate-200 rounded-xl bg-slate-50/70 p-6 sm:p-8">
                {/* Visual da Camisa Esportiva */}
                <div className="mx-auto w-48 sm:w-56 h-64 bg-slate-900 rounded-lg shadow-xs flex flex-col justify-between p-5 text-white relative overflow-hidden">
                  {/* Recorte Visual do Uniforme */}
                  <div className="absolute top-0 inset-x-0 h-2 bg-blue-600" />
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                    <span>HEELCLOTH</span>
                    <span>DRY-FIT</span>
                  </div>

                  <div className="text-center my-auto space-y-1">
                    <span className="block text-4xl sm:text-5xl font-black tracking-tight text-white font-mono">
                      10
                    </span>
                    <span className="block text-xs font-bold tracking-widest uppercase text-slate-200">
                      SILVA
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 font-mono">
                    <span>TAM: G</span>
                    <span>OFICIAL</span>
                  </div>
                </div>

                {/* Especificação do Produto */}
                <div className="mt-6 pt-5 border-t border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Modelo</span>
                    <span className="font-semibold text-slate-900">Camisa de Jogo Gola V</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tecido</span>
                    <span className="font-semibold text-slate-900">Dry-Fit 100% Poliéster</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Personalização</span>
                    <span className="font-semibold text-slate-900">Nome e número individual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Modalidades & Aplicações */}
      <section id="modalidades" className="py-16 sm:py-20 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
              Catálogo de Produtos
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
              Modelagens projetadas para cada modalidade
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Desenvolvemos uniformes com caimento ergonômico, adequados para treinos, campeonatos e eventos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-2">
              <h3 className="font-bold text-sm text-slate-950">Futebol & Futsal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kits completos com camisa de linha, camisa de goleiro em manga longa e calções com cordão ajustável.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-2">
              <h3 className="font-bold text-sm text-slate-950">Basquete & Vôlei</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Regatas e shorts leves com aberturas laterais para amplitude de movimento e rápida evaporação de suor.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-2">
              <h3 className="font-bold text-sm text-slate-950">Atléticas & Torcidas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tiragens sob medida com personalização total de escudo, patrocinadores e arte nas costas.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-2">
              <h3 className="font-bold text-sm text-slate-950">Corridas & Treinos</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Camisas ultraleves com proteção solar UV, indicadas para assessorias esportivas e academias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Como Funciona (Linha Direta em 3 Etapas) */}
      <section id="como-funciona" className="py-16 sm:py-20 border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
              Etapas do Pedido
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
              Como funciona o processo de compra
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Um fluxo direto para evitar erros de tamanho ou nomes grafados incorretamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-blue-600">01</span>
              <h3 className="font-bold text-base text-slate-900">
                Escolha o modelo e as peças
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Defina a quantidade de camisas de linha, camisas de goleiro e shorts necessários para a sua equipe.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-blue-600">02</span>
              <h3 className="font-bold text-base text-slate-900">
                Preencha a lista de jogadores
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Insira o nome, o número e o tamanho de cada atleta diretamente no formulário do pedido.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-blue-600">03</span>
              <h3 className="font-bold text-base text-slate-900">
                Acompanhe a confecção
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Com o pedido registrado, utilize seu código para acompanhar o corte, estampa, costura e envio.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-start">
            <Link
              href="/pedido"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>Iniciar preenchimento do meu pedido</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Qualidade & Materiais Técnicos */}
      <section id="materiais" className="py-16 sm:py-20 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Qualidade de Produção
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                Tecidos desenvolvidos para resistência e conforto térmico
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nossas peças são produzidas com malhas de poliéster de alta densidade e processo de sublimação total, onde a tinta adere diretamente à fibra do tecido sem criar película plástica.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <span className="font-bold text-xs text-slate-900 block mb-1">Sublimação Digital</span>
                <p className="text-xs text-slate-600">
                  Cores que não desbotam nem descascam após lavagens constantes.
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <span className="font-bold text-xs text-slate-900 block mb-1">Tecido Respirável</span>
                <p className="text-xs text-slate-600">
                  Estrutura de microfuros que favorece a troca térmica durante os jogos.
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <span className="font-bold text-xs text-slate-900 block mb-1">Costura Reforçada</span>
                <p className="text-xs text-slate-600">
                  Acabamento interlock nas cavas e gola para suportar o atrito da partida.
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <span className="font-bold text-xs text-slate-900 block mb-1">Padronização de Medidas</span>
                <p className="text-xs text-slate-600">
                  Grade milimétrica conferida peça a peça antes do despacho.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Tabela de Medidas Oficial */}
      <section id="tabela-medidas" className="py-16 sm:py-20 border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
              <Ruler className="h-4 w-4" />
              <span>Guia de Tamanhos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
              Tabela de medidas das camisas
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Meça uma camisa confortável da costura abaixo da axila (largura) e do ombro à barra (altura).
            </p>
          </div>

          {/* Seletor de Categoria de Tamanho */}
          <div className="flex gap-2 mb-6">
            {(["masculino", "feminino", "infantil"] as const).map((tipo) => (
              <button
                key={tipo}
                onClick={() => setAbaMedidas(tipo)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors capitalize ${
                  abaMedidas === tipo
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {tipo === "feminino" ? "Feminino (Babylook)" : tipo}
              </button>
            ))}
          </div>

          {/* Tabela Limpa e Extremamente Legível no Mobile */}
          <div className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                    <th className="py-3 px-4">Tamanho</th>
                    <th className="py-3 px-4">Largura (Tórax)</th>
                    <th className="py-3 px-4">Altura (Comprimento)</th>
                    <th className="py-3 px-4">Referência Indicada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medidas[abaMedidas].map((item) => (
                    <tr key={item.tamanho} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-950 font-mono">
                        {item.tamanho}
                      </td>
                      <td className="py-3 px-4 text-slate-700">{item.largura}</td>
                      <td className="py-3 px-4 text-slate-700">{item.altura}</td>
                      <td className="py-3 px-4 text-slate-500">{item.indicacao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-slate-50/50 border-t border-slate-200 text-[11px] text-slate-500">
              * Variação técnica de tolerância de até 1,5 cm permitida no corte têxtil.
            </div>
          </div>
        </div>
      </section>

      {/* 7. Consulta Direta de Rastreamento */}
      <section className="py-16 sm:py-20 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-slate-200 rounded-xl p-6 sm:p-10 bg-slate-50/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-950">
                Já possui um pedido em andamento?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Insira o código fornecido pela confecção para verificar o status atual e a lista de atletas cadastrada.
              </p>
            </div>

            <form onSubmit={handleBuscarRastreio} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input
                type="text"
                value={codigoRastreio}
                onChange={(e) => setCodigoRastreio(e.target.value)}
                placeholder="Ex: HC-2603-0001"
                className="px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-slate-950 w-full sm:w-64 bg-white"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs shrink-0"
              >
                Consultar Pedido
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 8. CTA Final de Fechamento */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-xl mx-auto">
            Pronto para vestir o seu time com qualidade profissional?
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            Monte a sua lista de atletas agora mesmo e receba o orçamento detalhado para a confecção da sua equipe.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pedido"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition"
            >
              <span>Fazer meu pedido</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/ajuda"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-semibold border border-slate-800 transition"
            >
              Tirar dúvidas
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Footer Corporativo & Acesso Restrito */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8 border-b border-slate-100">
            {/* Coluna 1: Marca */}
            <div className="space-y-2">
              <span className="font-black text-base tracking-tight text-slate-950">
                HEELCLOTH
              </span>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Confecção especializada em uniformes esportivos sob medida e fardamentos personalizados.
              </p>
            </div>

            {/* Coluna 2: Navegação */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">Links Úteis</span>
              <ul className="space-y-1.5 text-slate-600">
                <li>
                  <Link href="/pedido" className="hover:text-slate-950 transition-colors">
                    Fazer Pedido
                  </Link>
                </li>
                <li>
                  <Link href="/rastreio" className="hover:text-slate-950 transition-colors">
                    Acompanhar Pedido
                  </Link>
                </li>
                <li>
                  <a href="#tabela-medidas" className="hover:text-slate-950 transition-colors">
                    Tabela de Medidas
                  </a>
                </li>
                <li>
                  <Link href="/ajuda" className="hover:text-slate-950 transition-colors">
                    Perguntas Frequentes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Atendimento */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">Suporte</span>
              <p className="text-slate-500 leading-relaxed">
                Dúvidas sobre materiais ou personalização de camisas? Acesse nossa central de ajuda.
              </p>
              <Link
                href="/ajuda"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
              >
                <span>Central de Ajuda Heelcloth</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Faixa Inferior com Acesso Discreto */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Heelcloth Sportswear. Todos os direitos reservados.</p>

            {/* Acesso Administrativo Discreto */}
            <div className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 transition-colors">
              <Lock className="h-3 w-3" />
              <Link href="/login" className="hover:underline">
                Acesso do Colaborador
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
