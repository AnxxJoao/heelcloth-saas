"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shirt,
  Search,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  ShieldCheck,
  Truck,
  Layers,
  ChevronRight,
  Menu,
  X,
  Lock,
  MessageCircle,
} from "lucide-react";

export default function HomePage() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white flex flex-col">
      {/* 1. Header / Navbar Comercial */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition">
              <Shirt className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 leading-tight">
                HEELCLOTH
              </span>
              <span className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase">
                Sportswear & Uniformes
              </span>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#como-funciona" className="hover:text-blue-600 transition">
              Como Funciona
            </a>
            <a href="#modalidades" className="hover:text-blue-600 transition">
              Kits & Modalidades
            </a>
            <a href="#qualidade" className="hover:text-blue-600 transition">
              Qualidade de Fábrica
            </a>
            <Link
              href="/rastreio"
              className="inline-flex items-center gap-1.5 hover:text-blue-600 transition"
            >
              <Search className="h-3.5 w-3.5 text-slate-400" />
              Rastrear Pedido
            </Link>
          </nav>

          {/* Ações Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/rastreio"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
            >
              Já tenho um código
            </Link>
            <Link
              href="/pedido"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition active:scale-[0.98]"
            >
              <span>Fazer Pedido</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Botão Mobile Hamburger */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
            aria-label="Abrir menu"
          >
            {menuAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {menuAberto && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
            <a
              href="#como-funciona"
              onClick={() => setMenuAberto(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              Como Funciona
            </a>
            <a
              href="#modalidades"
              onClick={() => setMenuAberto(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              Kits & Modalidades
            </a>
            <a
              href="#qualidade"
              onClick={() => setMenuAberto(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              Qualidade de Fábrica
            </a>
            <Link
              href="/rastreio"
              onClick={() => setMenuAberto(false)}
              className="flex items-center gap-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              <Search className="h-4 w-4 text-slate-400" />
              Acompanhar Pedido
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/pedido"
                onClick={() => setMenuAberto(false)}
                className="w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition"
              >
                Fazer Meu Pedido
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section (Primeira Tela) */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-radial from-blue-50/60 via-slate-50 to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge de Destaque */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-2xs">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Confecção Sob Medida para Equipes e Atletas</span>
              </div>

              {/* Título Principal */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Camisas e uniformes personalizados feitos para o seu time.
              </h1>

              {/* Subtítulo */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Crie seu pedido de forma rápida, informe os jogadores com nomes, numeração e tamanhos, e receba seu orçamento sob medida para entrar em campo com qualidade profissional.
              </p>

              {/* Botões de Ação Principais */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/pedido"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/25 transition active:scale-[0.98]"
                >
                  <Shirt className="h-5 w-5" />
                  <span>Fazer meu pedido</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>

                <Link
                  href="/rastreio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm sm:text-base border border-slate-300 shadow-2xs transition active:scale-[0.98]"
                >
                  <Search className="h-4 w-4 text-slate-500" />
                  <span>Já fiz um pedido</span>
                </Link>
              </div>

              {/* Provas Sociais / Diferenciais Rápidos */}
              <div className="pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Sublimação Digital HD
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Tecidos Dry-Fit Respiráveis
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Rastreamento em Tempo Real
                </span>
              </div>
            </div>

            {/* Mockup Interativo do Pedido */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow decorativo sutil */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 blur-xl opacity-70" />

                {/* Card de Visualização do Kit */}
                <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                  {/* Topo do Card */}
                  <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                        <Shirt className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs block">Preview do Uniforme</span>
                        <span className="text-[10px] text-slate-400">Kit Oficial de Jogo</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                      Pronto para Confecção
                    </span>
                  </div>

                  {/* Representação Gráfica da Camisa */}
                  <div className="p-6 bg-slate-50/50 flex flex-col items-center justify-center border-b border-slate-100">
                    <div className="w-48 h-56 bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-4 flex flex-col items-center justify-between relative overflow-hidden">
                      {/* Faixa decorativa simulando recorte esportivo */}
                      <div className="absolute top-0 inset-x-0 h-4 bg-blue-600" />
                      <div className="pt-4 flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                          HEELCLOTH FC
                        </span>
                        <span className="text-3xl font-black text-slate-900 mt-1">10</span>
                        <span className="text-xs font-bold text-slate-800 tracking-wider uppercase mt-1">
                          RODRIGO
                        </span>
                      </div>
                      <div className="flex items-center justify-between w-full text-[10px] text-slate-500 border-t border-slate-100 pt-2 font-mono">
                        <span>Tam: G</span>
                        <span className="text-blue-600 font-bold">DRY-FIT</span>
                      </div>
                    </div>
                  </div>

                  {/* Resumo da Equipe */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Lista de Atletas:</span>
                      <span className="font-bold text-slate-900">18 Jogadores Cadastrados</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-600 w-5">#01</span>
                          <span className="font-medium text-slate-800">MARCOS SILVA</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">Goleiro • GG</span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-600 w-5">#07</span>
                          <span className="font-medium text-slate-800">LUCAS SANTOS</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">Linha • M</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/pedido"
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                      >
                        <span>Montar o uniforme da minha equipe</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Seção: Como Funciona o Pedido em 3 Passos */}
      <section id="como-funciona" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Passo a Passo Simples
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Como fazer o pedido do seu time
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Tudo foi planejado para você não perder tempo com planilhas confusas ou trocas de mensagens intermináveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Passo 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 font-black text-lg flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">
                1. Defina o Kit e Quantidades
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Escolha os modelos de camisa de jogo, camisa de goleiro, calções ou meiões de acordo com a necessidade da sua modalidade.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 font-black text-lg flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">
                2. Adicione os Jogadores
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Digite o nome nas costas, o número da camisa e o tamanho de cada atleta diretamente no formulário visual sem complicação.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 font-black text-lg flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">
                3. Acompanhe a Confecção
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Receba seu orçamento detalhado e acompanhe cada etapa da esteira têxtil com seu código exclusivo até a entrega final.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Seção: Modalidades Atendidas */}
      <section id="modalidades" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Versatilidade Esportiva
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Feito para qualquer modalidade e equipe
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Modelagens específicas para garantir mobilidade, conforto e resistência nas quadras, campos e pistas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                ⚽
              </div>
              <h4 className="font-bold text-sm text-slate-900">Futebol & Society</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Uniformes completos com camisa, calção e meião para torneios amadores e profissionais.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                🏀
              </div>
              <h4 className="font-bold text-sm text-slate-900">Basquete & Vôlei</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Regatas e shorts leves com caimento anatômico e máxima liberdade de movimento.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                🎓
              </div>
              <h4 className="font-bold text-sm text-slate-900">Atléticas & Faculdades</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Camisas personalizadas com artes exclusivas para jogos universitários e torcidas organizadas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                🏃
              </div>
              <h4 className="font-bold text-sm text-slate-900">Corridas & Academias</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Camisas dry-fit com proteção UV para assessorias esportivas e eventos corporativos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Seção: Diferenciais de Qualidade */}
      <section id="qualidade" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Padrão Industrial
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Qualidade de confecção que dura a temporada inteira
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                A Heelcloth une precisão de corte, tintas de alta fixação e controle de qualidade rigoroso para que sua equipe receba uniformes impecáveis.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Sublimação Digital Total</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Cores vivas que não desbotam, não trincam e não descascam com as lavagens.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Costura Reforçada & Malha Dry-Fit</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fios de alta resistência com toque macio e rápida absorção de transpiração.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Rastreamento da Fábrica à Sua Mão</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Consulte a evolução do lote em tempo real com o código fornecido no seu pedido.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Pronto para uniformizar sua equipe?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Não deixe para a última hora. Cadastre a lista de jogadores agora e garanta a produção do seu time com pontualidade.
              </p>
              <div className="space-y-3 pt-2">
                <Link
                  href="/pedido"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition"
                >
                  <Shirt className="h-4 w-4" />
                  <span>Iniciar Pedido Agora</span>
                </Link>
                <Link
                  href="/rastreio"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-sm transition border border-slate-700"
                >
                  <Search className="h-4 w-4 text-slate-400" />
                  <span>Consultar Pedido Existente</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Corporativo com Acesso Administrativo Discreto */}
      <footer className="mt-auto bg-white border-t border-slate-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
            {/* Coluna 1: Marca */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Shirt className="h-4 w-4" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  HEELCLOTH
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Especialistas em confecção de uniformes esportivos sob medida, fardamentos e camisas personalizadas com alta tecnologia têxtil.
              </p>
            </div>

            {/* Coluna 2: Links do Cliente */}
            <div className="space-y-2.5">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 block">
                Atendimento ao Cliente
              </span>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <Link href="/pedido" className="hover:text-blue-600 transition">
                    Fazer Novo Pedido
                  </Link>
                </li>
                <li>
                  <Link href="/rastreio" className="hover:text-blue-600 transition">
                    Acompanhar Rastreamento
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Contato & Dúvidas */}
            <div className="space-y-2.5">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 block">
                Suporte
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dúvidas sobre tecidos, tabelas de medidas ou prazos de produção?
              </p>
              <Link
                href="/rastreio"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-bold hover:underline"
              >
                <span>Acessar portal do pedido</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Faixa Inferior do Footer com Acesso Administrativo Discreto */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Heelcloth Sportswear. Todos os direitos reservados.</p>

            {/* Acesso do Colaborador / Fábrica (Discreto e Elegante) */}
            <div className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition">
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
