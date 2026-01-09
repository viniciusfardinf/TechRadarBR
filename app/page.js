"use client";
import { useState, useEffect, useMemo } from 'react';
import { produtos } from '../data/produtos';


export default function Home() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Fone de Ouvido");
  const [busca, setBusca] = useState("");
  const [marcaAtiva, setMarcaAtiva] = useState("Todas");
  const [mounted, setMounted] = useState(false);
  const [ordem, setOrdem] = useState("padrao");
  const [darkMode, setDarkMode] = useState(false);
  const [precoMax, setPrecoMax] = useState(0);

  const precoMaximoFixo = 5000;

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const limparFiltros = () => {
    setBusca("");
    setMarcaAtiva("Todas");
    setPrecoMax(0);
    setOrdem("padrao");
  };

  const marcasDisponiveis = useMemo(() => {
    const produtosDaCategoria = produtos.filter(p => p.categoria === categoriaAtiva);
    const marcas = produtosDaCategoria.map(p => p.nome.split(' ')[0].replace("'", ""));
    return ["Todas", ...new Set(marcas)];
  }, [categoriaAtiva]);

  const produtosFiltrados = useMemo(() => {
    let resultado = produtos.filter(p => {
      const catMatch = p.categoria === categoriaAtiva;
      const buscaMatch = p.nome.toLowerCase().includes(busca.toLowerCase());
      const precoMatch = precoMax === 0 ? true : p.preco <= precoMax;
      const marcaMatch = marcaAtiva === "Todas" ? true : p.nome.includes(marcaAtiva);
      return catMatch && buscaMatch && precoMatch && marcaMatch;
    });

    if (ordem === "menor") resultado.sort((a, b) => a.preco - b.preco);
    if (ordem === "maior") resultado.sort((a, b) => b.preco - a.preco);
    if (ordem === "az") resultado.sort((a, b) => a.nome.localeCompare(b.nome));

    return resultado;
  }, [categoriaAtiva, busca, precoMax, ordem, marcaAtiva]);

  if (!mounted) return null;

  return (
    <main className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-black'}`}>
      
      {/* HEADER SEO OPTIMIZED */}
      <header className={`sticky top-0 z-50 border-b ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-700'} py-3 px-6 shadow-lg text-white`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter italic uppercase">
              TechRadar<span className="text-orange-500">BR</span>
            </h1>
            <span className="text-[7px] font-bold tracking-[0.3em] opacity-50 uppercase -mt-1">Melhores preços 2026</span>
          </div>

          <div className="relative flex-1 max-w-xs hidden md:block">
            <input 
              type="text" value={busca} placeholder="Buscar fone, celular ou relógio..."
              className="w-full py-2 px-4 pl-10 rounded-lg text-xs outline-none bg-white/10 border border-white/20 focus:bg-white focus:text-black transition-all"
              onChange={(e) => setBusca(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 opacity-40 text-xs">🔍</span>
          </div>

          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-white/5 text-yellow-400">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10">
        
        {/* CATEGORIAS COM TAGS HTML5 SEMÂNTICAS */}
        <nav className="mb-14 flex flex-col items-center">
          <h2 className="text-[11px] font-black uppercase text-orange-500 tracking-[0.4em] mb-8">Guia de Compra Por Categoria</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
            {[
              { id: "Fone de Ouvido", nome: "Melhores Fones", icon: "🎧" },
              { id: "Relogio inteligente", nome: "Relógios / Smart", icon: "⌚" },
              { id: "Celular", nome: "Celulares / Ofertas", icon: "📱" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategoriaAtiva(cat.id); limparFiltros(); }}
                className={`flex flex-col items-center gap-2 p-6 rounded-3xl border-2 transition-all duration-300 ${
                  categoriaAtiva === cat.id 
                  ? "border-orange-500 bg-white text-orange-600 shadow-xl scale-105" 
                  : darkMode ? "bg-slate-900 border-slate-800 text-slate-500" : "bg-white border-slate-200 text-black font-bold hover:border-orange-500"
                }`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-[11px] font-black uppercase tracking-tight">{cat.nome}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <aside className="w-full lg:w-72 shrink-0">
            <div className={`p-8 rounded-[2.5rem] sticky top-28 border-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-white shadow-2xl'}`}>
              
              {/* FILTRO PREÇO */}
              <div className="mb-10">
                <h3 className="text-sm font-black uppercase mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-orange-500 rounded-full"></span> Melhor Preço Até
                </h3>
                <span className="text-3xl font-black tracking-tighter text-black block mb-4">
                  {precoMax > 0 ? `R$ ${precoMax}` : 'Ver Todos'}
                </span>
                <input 
                  type="range" min="0" max={precoMaximoFixo} step="10" value={precoMax} 
                  onChange={(e) => setPrecoMax(Number(e.target.value))} 
                  className="w-full h-1.5 bg-slate-200 rounded-full appearance-none accent-orange-500 cursor-pointer" 
                />
              </div>

              {/* FILTRO MARCAS */}
              <div className="mb-10">
                <h3 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-orange-500 rounded-full"></span> Filtrar Marca
                </h3>
                <div className="flex flex-wrap gap-2">
                  {marcasDisponiveis.map(marca => (
                    <button 
                      key={marca} onClick={() => setMarcaAtiva(marca)} 
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${
                        marcaAtiva === marca ? "bg-black text-white" : "bg-slate-100 text-slate-500 hover:bg-orange-100"
                      }`}
                    >
                      {marca}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={limparFiltros} className="w-full py-4 mb-8 rounded-2xl border-2 border-dashed border-slate-200 text-[9px] font-black text-slate-400 hover:border-orange-500 hover:text-orange-500 transition-all uppercase">
                Limpar Todos os Filtros
              </button>
            </div>
          </aside>

          {/* VITRINE */}
          <section className="flex-1 grid gap-4">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map(p => (
                <article key={p.id} className={`group flex flex-col sm:flex-row items-center gap-8 p-5 rounded-[2.5rem] border-2 transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-white shadow-sm hover:border-orange-500/50'}`}>
                  
                  <div className="w-44 h-44 bg-white rounded-3xl flex items-center justify-center p-5 shrink-0 shadow-inner overflow-hidden">
                    <img src={p.img} alt={`Oferta ${p.nome}`} className="object-contain max-h-full transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase mb-3 inline-block">
                      {p.destaque}
                    </span>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2 leading-tight">
                      {p.nome}
                    </h3>
                    <p className={`text-[12px] leading-relaxed italic font-medium ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      {p.descricao}
                    </p>
                  </div>

                  <div className="flex flex-col items-center sm:items-end min-w-[180px] gap-4">
                    <div className="text-center sm:text-right">
                      <span className="text-3xl font-black italic tracking-tighter">
                        <span className="text-sm mr-1 opacity-30 font-bold">R$</span>
                        {p.preco.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <a 
                      href={p.link} 
                      target="_blank" 
                      className="w-full bg-black hover:bg-orange-500 text-white py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all text-center"
                    >
                      Aproveitar Oferta
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                <p className="text-2xl font-black italic uppercase text-slate-200">Nada encontrado</p>
              </div>
            )}
          </section>
        </div>

        {/* NUVEM DE KEYWORDS ESCONDIDA (SEO) */}
        <section className="sr-only">
           <h2>Pesquisas relacionadas: melhor preço fone bluetooth 2026, smartphone 256gb barato, 
           qual relógio inteligente comprar, fone jbl promoção, celular samsung a54 oferta, 
           fone academia sem fio, melhor bateria celular motorola, techradar brasil eletrônicos.</h2>
        </section>
      </div>

      <footer className="py-16 text-center border-t border-slate-100 mt-20">
         <div className="max-w-4xl mx-auto px-6 opacity-30">
            <p className="text-[8px] font-black uppercase tracking-[1em] mb-4">TechRadar Brasil &copy; 2026</p>
            <p className="text-[7px] leading-loose">
              Melhor fone bluetooth 2026, celular custo benefício, fone de ouvido para academia, 
              melhor smartwatch barato, xiaomi ou samsung qual comprar, fone jbl em promoção, 
              motorola edge 50 neo preço, oppo a60 vale a pena, melhor celular até 2000 reais, 
              fone com cancelamento de ruído barato, relógio inteligente que faz chamada, 
              fone philips tat1109 review, celular com melhor bateria, fone para correr.
            </p>
         </div>
      </footer>
    </main>
  );
}