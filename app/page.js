"use client";
import { useState, useEffect, useMemo } from 'react';
import { produtos } from '../data/produtos';

export default function Home() {
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [busca, setBusca] = useState("");
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const categorias = [
    { id: "Consoles", nome: "Consoles", icon: "🎮" },
    { id: "PC Gamer", nome: "PC Gamer", icon: "🖥️" },
    { id: "Alexa", nome: "Casa Inteligente", icon: "🏡" },
    { id: "Celular", nome: "Smartphones", icon: "📱" },
    { id: "Fone de Ouvido", nome: "Áudio / Fones", icon: "🎧" },
    { id: "Relogio inteligente", nome: "Smartwatches", icon: "⌚" }
  ];

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  // Busca global ou por categoria
  const produtosFiltrados = useMemo(() => {
    return produtos.filter(p => {
      const catMatch = categoriaAtiva ? p.categoria === categoriaAtiva : true;
      const buscaMatch = p.nome.toLowerCase().includes(busca.toLowerCase());
      return catMatch && buscaMatch;
    });
  }, [categoriaAtiva, busca]);

  if (!mounted) return null;

  return (
    <main className={`min-h-screen transition-all ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-black'}`}>
      
      <header className={`sticky top-0 z-50 border-b ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-700 text-white'} py-3 px-6 shadow-md`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
          <div className="cursor-pointer" onClick={() => {setCategoriaAtiva(null); setBusca("");}}>
            <h1 className="text-xl font-black italic uppercase tracking-tighter">
              TechRadar<span className="text-orange-500">BR</span>
            </h1>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-white/5 text-yellow-400">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10">
        
        {/* BUSCA GLOBAL (Sempre Visível ou só na Home) */}
        <div className="max-w-2xl mx-auto mb-16">
           <div className="relative">
              <input 
                type="text" 
                placeholder="Pesquisar em todo o catálogo tech..."
                value={busca}
                className={`w-full p-5 pl-12 rounded-[2rem] outline-none border-2 transition-all shadow-lg ${darkMode ? 'bg-slate-900 border-slate-800 focus:border-orange-500' : 'bg-white border-slate-100 focus:border-orange-500'}`}
                onChange={(e) => setBusca(e.target.value)}
              />
              <span className="absolute left-5 top-5 opacity-40">🔍</span>
           </div>
        </div>

        {/* TELA INICIAL OU RESULTADOS DE BUSCA GLOBAL */}
        {(!categoriaAtiva && busca === "") ? (
          <section className="animate-in fade-in duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
                O que você busca <span className="text-orange-500">hoje?</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaAtiva(cat.id)}
                  className={`group flex flex-col items-center justify-center p-6 aspect-square rounded-[2rem] border-2 transition-all text-center ${
                    darkMode ? 'bg-slate-900 border-slate-800 hover:border-orange-500' : 'bg-white border-slate-100 shadow-xl hover:border-orange-500'
                  }`}
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <h3 className="text-[10px] font-black uppercase tracking-widest">{cat.nome}</h3>
                </button>
              ))}
            </div>
          </section>
        ) : (
          /* VITRINE (FILTRADA POR CATEGORIA OU BUSCA GLOBAL) */
          <section className="animate-in slide-in-from-bottom-5 duration-500">
            <div className="flex items-center gap-4 mb-10">
              {(categoriaAtiva || busca !== "") && (
                <button 
                  onClick={() => {setCategoriaAtiva(null); setBusca("");}}
                  className="px-4 py-2 rounded-full bg-orange-500 text-white font-bold text-[10px] uppercase shadow-lg"
                >
                  ← Ver Categorias
                </button>
              )}
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                {categoriaAtiva || `Resultados para: ${busca}`}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {produtosFiltrados.map(p => (
                <article key={p.id} className={`flex flex-col sm:flex-row items-center gap-6 p-5 rounded-[2.5rem] border-2 transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-50 shadow-sm hover:border-orange-500/30'}`}>
                  <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center p-4 shrink-0 shadow-inner">
                    <img src={p.img} alt={p.nome} className="max-h-full object-contain" />
                  </div>
                  <div className="flex-1 w-full">
                    <span className="text-[8px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full uppercase mb-2 inline-block">{p.destaque}</span>
                    <h3 className="text-sm font-black uppercase italic leading-tight mb-2 tracking-tight">{p.nome}</h3>
                    <div className="mb-4">
                      <span className="text-xl font-black italic">R$ {p.preco.toFixed(2).replace('.', ',')}</span>
                    </div>
                    
                    {/* BOTÕES DE COMPRA SEMPRE VISÍVEIS */}
                    <div className="flex flex-col gap-2">
                      {p.links?.amazon || p.link ? (
                        <a href={p.links?.amazon || p.link} target="_blank" className="bg-black text-white py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-center hover:bg-orange-500 transition-all">
                          Ver na Amazon
                        </a>
                      ) : null}
                      {p.links?.mercadolivre && (
                        <a href={p.links.mercadolivre} target="_blank" className="bg-yellow-400 text-black py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-center hover:bg-yellow-500 transition-all">
                          Mercado Livre
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer className="py-16 text-center opacity-10 text-[8px] font-black uppercase tracking-[1em]">
         TechRadar Brasil &copy; 2026
      </footer>
    </main>
  );
}