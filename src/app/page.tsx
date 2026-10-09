"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { EditorialSlideshow } from "@/components/EditorialSlideshow";

export default function HomePage() {
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [navAtiva, setNavAtiva] = useState<"colecao" | "novidades" | "editorial" | "sobre">("colecao");

  return (
    <div className="min-h-screen bg-[#49AAB8] p-3 sm:p-5 lg:p-6 flex flex-col items-center justify-start font-editorial selection:bg-[#49AAB8] selection:text-white">
      {/* Grande Canvas Editorial Branco Central */}
      <div className="w-full max-w-[1540px] bg-[#FCFCFB] text-[#121212] rounded-sm sm:rounded-md shadow-xs flex flex-col min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-40px)] relative overflow-hidden">
        
        {/* ==================================================================== */}
        {/* HEADER CONTIDO NO TOPO DO CANVAS */}
        {/* ==================================================================== */}
        <header className="w-full px-5 sm:px-8 lg:px-12 py-5 sm:py-6 flex items-center justify-between border-b border-black/[0.06] bg-[#FCFCFB]/90 backdrop-blur-xs sticky top-0 z-30">
          {/* Logo da Marca (Tipografia Editorial Original) */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49AAB8] rounded-xs"
          >
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#121212] transition-opacity group-hover:opacity-80">
              HEELCLOTH
            </span>
          </Link>

          {/* Navegação Desktop: Recipiente Preto em Formato Cápsula */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center bg-[#121212] text-white rounded-full p-1 shadow-xs"
          >
            <button
              type="button"
              onClick={() => setNavAtiva("colecao")}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49AAB8] ${
                navAtiva === "colecao"
                  ? "bg-[#49AAB8] text-white shadow-2xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Coleção
            </button>
            <button
              type="button"
              onClick={() => setNavAtiva("novidades")}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49AAB8] ${
                navAtiva === "novidades"
                  ? "bg-[#49AAB8] text-white shadow-2xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Novidades
            </button>
            <button
              type="button"
              onClick={() => setNavAtiva("editorial")}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49AAB8] ${
                navAtiva === "editorial"
                  ? "bg-[#49AAB8] text-white shadow-2xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Editorial
            </button>
            <button
              type="button"
              onClick={() => setNavAtiva("sobre")}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49AAB8] ${
                navAtiva === "sobre"
                  ? "bg-[#49AAB8] text-white shadow-2xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Sobre
            </button>
          </nav>

          {/* Ações à Direita */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-9 px-4 rounded-full border border-black/15 bg-white text-xs sm:text-[13px] font-medium text-[#121212] hover:bg-black/5 active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49AAB8]"
            >
              Entrar
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-9 px-4 rounded-full bg-[#121212] text-xs sm:text-[13px] font-medium text-white hover:bg-black/85 active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49AAB8]"
            >
              Criar conta
            </Link>
          </div>

          {/* Botão Mobile Hambúrguer */}
          <button
            type="button"
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
            aria-expanded={menuMobileAberto}
            aria-label="Abrir menu de navegação"
            className="md:hidden p-2 rounded-full border border-black/10 text-[#121212] hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49AAB8]"
          >
            {menuMobileAberto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Menu Mobile Retrátil e Acessível */}
        {menuMobileAberto && (
          <div className="md:hidden bg-[#FCFCFB] border-b border-black/10 px-6 py-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2 text-sm font-medium text-[#121212]">
              <button
                type="button"
                onClick={() => {
                  setNavAtiva("colecao");
                  setMenuMobileAberto(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-black/5"
              >
                Coleção
              </button>
              <button
                type="button"
                onClick={() => {
                  setNavAtiva("novidades");
                  setMenuMobileAberto(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-black/5"
              >
                Novidades
              </button>
              <button
                type="button"
                onClick={() => {
                  setNavAtiva("editorial");
                  setMenuMobileAberto(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-black/5"
              >
                Editorial
              </button>
              <button
                type="button"
                onClick={() => {
                  setNavAtiva("sobre");
                  setMenuMobileAberto(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-black/5"
              >
                Sobre
              </button>
            </nav>
            <div className="pt-3 border-t border-black/10 flex items-center gap-2">
              <Link
                href="/login"
                className="flex-1 text-center py-2 rounded-full border border-black/20 text-xs font-semibold text-[#121212]"
              >
                Entrar
              </Link>
              <Link
                href="/login"
                className="flex-1 text-center py-2 rounded-full bg-[#121212] text-xs font-semibold text-white"
              >
                Criar conta
              </Link>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* HERO SECTION — CENTRALIZADO COM SLIDESHOW EDITORIAL NA BASE */}
        {/* ==================================================================== */}
        <main className="flex-1 flex flex-col justify-between px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-8 sm:pb-12 max-w-[1440px] w-full mx-auto">
          
          {/* Bloco de Título e Chamada Central */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto my-auto py-2 sm:py-6">
            
            {/* Headline com Tipografia Sans Forte */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#121212] leading-[1.05] max-w-2xl sm:max-w-3xl">
              Moda que acompanha o seu ritmo.
            </h1>

            {/* Subheadline Arejada */}
            <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-[#606060] max-w-xl leading-relaxed font-normal">
              Peças autorais para vestir com leveza, presença e liberdade.
            </p>

            {/* CTA Primário em Azul Aqua no Formato Cápsula com Seta SVG */}
            <div className="mt-6 sm:mt-8 flex items-center justify-center">
              <a
                href="#colecao"
                className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-[#49AAB8] hover:bg-[#368D9C] text-white text-sm sm:text-[15px] font-semibold transition-all duration-200 active:scale-[0.98] shadow-2xs group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49AAB8] focus-visible:ring-offset-2"
              >
                <span>Conheça a coleção</span>
                <ArrowUpRight
                  className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>
          </div>

          {/* Faixa / Slideshow Horizontal Editorial de Imagens Verticais na Base */}
          <div id="colecao" className="w-full mt-8 sm:mt-12 pt-4 border-t border-black/[0.04]">
            <div className="flex items-center justify-between mb-3 px-1 text-xs text-[#606060] font-medium">
              <span className="uppercase tracking-wider font-mono text-[11px] text-[#121212]/50">
                Editorial da Coleção
              </span>
              <span className="hidden sm:inline-block text-[11px] text-[#606060]/70 font-mono">
                Arrraste ou navegue com as setas
              </span>
            </div>

            <EditorialSlideshow />
          </div>
        </main>

        {/* ==================================================================== */}
        {/* RODAPÉ EDITORIAL DISCRETO (SEM RUÍDO OPERACIONAL) */}
        {/* ==================================================================== */}
        <footer className="w-full px-5 sm:px-8 lg:px-12 py-5 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#606060]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#121212]">HEELCLOTH</span>
            <span className="text-black/20">•</span>
            <span>Edição Contemporânea</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#colecao" className="hover:text-[#121212] transition-colors">
              Coleção
            </a>
            <a href="#editorial" className="hover:text-[#121212] transition-colors">
              Editorial
            </a>
            <Link href="/login" className="hover:text-[#121212] transition-colors">
              Acesso
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
