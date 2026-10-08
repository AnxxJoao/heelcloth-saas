import Link from "next/link";
import { Shirt, LayoutDashboard, ShoppingCart, Search, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-3xl w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 mb-2 shadow-xl shadow-indigo-600/20">
          <Shirt className="w-8 h-8 text-indigo-400" />
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Heelcloth Sportswear
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          SaaS ERP de Manufatura e Gestão Integrada para Confecção de Camisas, Uniformes Esportivos e Kits Sob Medida.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          {/* Card 1: Fazer Pedido */}
          <Link
            href="/pedido"
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-slate-850 transition-all duration-200 group shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800/50 flex items-center justify-center mb-3 group-hover:scale-105 transition">
              <ShoppingCart className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="font-bold text-sm text-white group-hover:text-indigo-400 transition">
              Fazer Pedido
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Monte sua lista de uniformes e solicite orçamento sob medida
            </p>
          </Link>

          {/* Card 2: Área do Cliente (Rastreio) */}
          <Link
            href="/rastreio"
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-slate-850 transition-all duration-200 group shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800/50 flex items-center justify-center mb-3 group-hover:scale-105 transition">
              <Search className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="font-bold text-sm text-white group-hover:text-emerald-400 transition">
              Área do Cliente
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Rastreie seu pedido e confira a lista de nomes e números
            </p>
          </Link>

          {/* Card 3: Painel Administrativo */}
          <Link
            href="/admin/dashboard"
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-slate-850 transition-all duration-200 group shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800/50 flex items-center justify-center mb-3 group-hover:scale-105 transition">
              <LayoutDashboard className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="font-bold text-sm text-white group-hover:text-blue-400 transition">
              Painel Admin
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Produção, estoque, financeiro, CorelDRAW e NF-e
            </p>
          </Link>
        </div>

        <div className="pt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Sistema Seguro & Auditado
          </span>
          <span>•</span>
          <span>Heelcloth ERP v1.0 (Next.js 15)</span>
        </div>
      </div>
    </div>
  );
}
