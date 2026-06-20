import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { heroSlides, trailHighlights } from "../../data/siteContent";
import Footer from "../Footer";

type Trilha = {
  id: string;
  titulo: string;
  descricao: string;
  nivel: string;
  distanciaKm: number;
  diasDaTrilha: number;
  tempoAproximado: string;
  imagemBase64?: string | null;
  imagemNome?: string | null;
  createdAt: string;
};

type Evento = {
  id: string;
  titulo: string;
  descricao: string;
  endereco?: string | null;
  inicioEm?: string | null;
  fimEm?: string | null;
  encerrado: boolean;
  imagemBase64?: string | null;
  imagemNome?: string | null;
  createdAt: string;
};

type FallbackEvento = {
  titulo: string;
  descricao: string;
  endereco: string;
  inicioEm: string;
  fimEm: string;
  encerrado: boolean;
  imagem: string;
};

const TRILHAS_POR_PAGINA = 6;

const fallbackEventos: FallbackEvento[] = [
  {
    titulo: "Caminhada guiada no PARNASO",
    descricao:
      "Um encontro para quem quer aprender sobre segurança, fauna e conservação enquanto percorre trilhas da serra.",
    endereco: "Centro de visitantes da Serra dos Órgãos",
    inicioEm: "2026-06-30T08:00:00",
    fimEm: "2026-06-30T12:00:00",
    encerrado: false,
    imagem: "/assets/IMG-20250528-WA0011.jpg",
  },
  {
    titulo: "Oficina de educação ambiental",
    descricao:
      "Atividade voltada para escolas, famílias e grupos que desejam entender melhor a Mata Atlântica local.",
    endereco: "Parque Montanhas de Teresópolis",
    inicioEm: "2026-07-05T09:00:00",
    fimEm: "2026-07-05T11:30:00",
    encerrado: false,
    imagem: "/assets/logo-montanhas-teresopolis.webp",
  },
  {
    titulo: "Roteiro Três Picos de observação",
    descricao:
      "Um roteiro orientado para visitantes interessados em espécies de altitude, fotografia e preservação.",
    endereco: "Parque Estadual dos Três Picos",
    inicioEm: "2026-07-12T07:00:00",
    fimEm: "2026-07-12T14:00:00",
    encerrado: false,
    imagem: "/assets/tres-picos-hero.jpg",
  },
];

const formatarDataHora = (valor?: string | null) => {
  if (!valor || Number.isNaN(new Date(valor).getTime())) {
    return "Sem data";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(valor));
};

const eventoEstaEncerrado = (evento: Pick<Evento, "fimEm" | "encerrado">) =>
  evento.encerrado ||
  (evento.fimEm ? new Date(evento.fimEm).getTime() < Date.now() : false);

const Home = () => {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventosLoading, setEventosLoading] = useState(true);
  const [error, setError] = useState("");
  const [eventosError, setEventosError] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const carregarTrilhas = async () => {
      try {
        const response = await fetch("http://localhost:3000/trilhas");
        if (!response.ok) {
          throw new Error("Falha ao carregar trilhas");
        }

        const data = (await response.json()) as Trilha[];
        setTrilhas(data);
      } catch {
        setError("Não foi possível carregar as trilhas no momento.");
      } finally {
        setLoading(false);
      }
    };

    carregarTrilhas();
  }, []);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const response = await fetch("http://localhost:3000/eventos");
        if (!response.ok) {
          throw new Error("Falha ao carregar eventos");
        }

        const data = (await response.json()) as Evento[];
        setEventos(data);
      } catch {
        setEventosError("Não foi possível carregar os eventos no momento.");
      } finally {
        setEventosLoading(false);
      }
    };

    carregarEventos();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  const totalPaginas = Math.max(
    1,
    Math.ceil((trilhas.length || trailHighlights.length) / TRILHAS_POR_PAGINA),
  );

  const trilhasComFallback = useMemo(() => {
    if (trilhas.length > 0) {
      return trilhas.map((trilha, index) => ({
        id: trilha.id,
        titulo: trilha.titulo,
        descricao: trilha.descricao,
        nivel: trilha.nivel,
        distanciaKm: trilha.distanciaKm,
        diasDaTrilha: trilha.diasDaTrilha,
        tempoAproximado: trilha.tempoAproximado,
        imagem:
          trilha.imagemBase64 ??
          trailHighlights[index % trailHighlights.length].image,
        parque: trailHighlights[index % trailHighlights.length].park,
      }));
    }

    return trailHighlights.map((trilha) => ({
      id: `${trilha.title}-${trilha.park}`,
      titulo: trilha.title,
      descricao: trilha.description,
      nivel: trilha.level,
      distanciaKm:
        Number(trilha.distance.replace(" km", "").replace(",", ".")) || 0,
      diasDaTrilha: 1,
      tempoAproximado: trilha.distance,
      imagem: trilha.image,
      parque: trilha.park,
    }));
  }, [trilhas]);

  const trilhasVisiveis = useMemo(() => {
    const inicio = paginaAtual * TRILHAS_POR_PAGINA;
    return trilhasComFallback.slice(inicio, inicio + TRILHAS_POR_PAGINA);
  }, [paginaAtual, trilhasComFallback]);

  const eventosComFallback = useMemo(() => {
    if (eventos.length > 0) {
      return eventos.map((evento, index) => ({
        id: evento.id,
        titulo: evento.titulo,
        descricao: evento.descricao,
        endereco: evento.endereco ?? "Sem endereço informado",
        inicioEm: evento.inicioEm,
        fimEm: evento.fimEm,
        encerrado: eventoEstaEncerrado(evento),
        imagem:
          evento.imagemBase64 ??
          fallbackEventos[index % fallbackEventos.length].imagem,
      }));
    }

    return fallbackEventos.map((evento) => ({
      id: evento.titulo,
      titulo: evento.titulo,
      descricao: evento.descricao,
      endereco: evento.endereco,
      inicioEm: evento.inicioEm,
      fimEm: evento.fimEm,
      encerrado: evento.encerrado,
      imagem: evento.imagem,
    }));
  }, [eventos]);

  const irParaAnterior = () => {
    setPaginaAtual((pagina) => Math.max(0, pagina - 1));
  };

  const irParaProxima = () => {
    setPaginaAtual((pagina) => Math.min(totalPaginas - 1, pagina + 1));
  };

  const slideAtual = heroSlides[heroIndex];

  return (
    <main className="space-y-16 pb-20">
      <section className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-950/70 shadow-[0_30px_120px_rgba(15,23,42,0.35)]">
          <img
            src={slideAtual.image}
            alt={slideAtual.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,18,0.12)_0%,rgba(6,10,18,0.56)_48%,rgba(6,10,18,0.9)_100%)]" />
          <div className="relative grid min-h-[78vh] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-12">
            <div className="flex flex-col justify-end">
              <span className="mb-4 inline-flex w-fit rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-1 text-xs font-semibold tracking-[0.28em] text-emerald-100 uppercase">
                {slideAtual.badge}
              </span>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {slideAtual.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                {slideAtual.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={slideAtual.link}
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {slideAtual.cta}
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => setHeroIndex(index)}
                      className={`group overflow-hidden rounded-2xl border text-left transition-all duration-200 ${
                        index === heroIndex
                          ? "border-emerald-300/70 bg-slate-900/85 shadow-[0_18px_48px_rgba(16,185,129,0.15)]"
                          : "border-white/10 bg-slate-900/45 hover:border-white/20 hover:bg-slate-900/65"
                      }`}
                    >
                      <div className="flex gap-4 p-3">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="h-16 w-24 shrink-0 rounded-2xl object-cover"
                        />
                        <div className="min-w-0 flex-1 py-1">
                          <p className="text-[11px] font-semibold tracking-[0.28em] text-emerald-200 uppercase">
                            {slide.badge}
                          </p>
                          <h2 className="mt-2 truncate text-sm font-semibold text-white">
                            {slide.title}
                          </h2>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() =>
                    setHeroIndex(
                      (current) =>
                        (current - 1 + heroSlides.length) % heroSlides.length,
                    )
                  }
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/15"
                >
                  Anterior
                </button>
                <div className="text-center text-xs tracking-[0.2em] text-slate-300 uppercase">
                  {String(heroIndex + 1).padStart(2, "0")} / {heroSlides.length}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setHeroIndex((current) => (current + 1) % heroSlides.length)
                  }
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/15"
                >
                  Próxima
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 border-b border-white/10 pb-4">
          <span className="text-xs font-semibold tracking-[0.28em] text-emerald-200 uppercase">
            Trilhas
          </span>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Explorando novos caminhos
          </h2>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300">
            Carregando trilhas...
          </div>
        ) : error && trilhas.length === 0 ? (
          <div className="rounded-3xl border border-rose-300/20 bg-rose-500/10 p-8 text-center text-sm text-rose-100">
            {error}
          </div>
        ) : trilhasComFallback.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300">
            Ainda não existem trilhas cadastradas.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {trilhasVisiveis.map((trilha) => (
                <article
                  key={trilha.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/75 shadow-[0_20px_60px_rgba(15,23,42,0.24)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <img
                    src={trilha.imagem}
                    alt={trilha.titulo}
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold tracking-[0.18em] text-emerald-200 uppercase">
                        {trilha.nivel}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {trilha.distanciaKm} km
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                      {trilha.titulo}
                    </h3>
                    <p className="mt-2 max-h-12 overflow-hidden text-sm leading-6 text-slate-300">
                      {trilha.descricao}
                    </p>
                    <div className="mt-4 space-y-1 text-xs leading-5 text-slate-400">
                      <p>
                        Dias de trilha:{" "}
                        {trilha.diasDaTrilha === 1
                          ? "1 dia"
                          : `${trilha.diasDaTrilha} dias`}
                      </p>
                      <p>Tempo total aproximado: {trilha.tempoAproximado}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {trilhasComFallback.length > TRILHAS_POR_PAGINA ? (
              <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
                <button
                  type="button"
                  onClick={irParaAnterior}
                  disabled={paginaAtual === 0}
                  className="rounded-full border border-white/15 bg-slate-950/80 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Anterior
                </button>

                <span className="text-sm font-medium text-slate-300">
                  Página {paginaAtual + 1} de {totalPaginas}
                </span>

                <button
                  type="button"
                  onClick={irParaProxima}
                  disabled={paginaAtual >= totalPaginas - 1}
                  className="rounded-full border border-white/15 bg-slate-950/80 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            ) : null}
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 border-b border-white/10 pb-4">
          <span className="text-xs font-semibold tracking-[0.28em] text-emerald-200 uppercase">
            Eventos
          </span>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Programação e encontros
          </h2>
        </div>

        {eventosLoading ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300">
            Carregando eventos...
          </div>
        ) : eventosError && eventos.length === 0 ? (
          <div className="rounded-3xl border border-rose-300/20 bg-rose-500/10 p-8 text-center text-sm text-rose-100">
            {eventosError}
          </div>
        ) : (
          <div className="space-y-2.5">
            {eventosComFallback.map((evento) => (
              <article
                key={evento.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/75 shadow-[0_16px_48px_rgba(15,23,42,0.22)] transition-transform duration-200 hover:-translate-y-0.5 md:flex-row"
              >
                <img
                  src={evento.imagem}
                  alt={evento.titulo}
                  className="h-28 w-full object-cover md:h-auto md:w-40 md:shrink-0"
                />
                <div className="flex-1 p-2.5">
                  <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                    <h3 className="text-[13px] font-semibold text-white">
                      {evento.titulo}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        evento.encerrado
                          ? "bg-slate-100/10 text-slate-200"
                          : "bg-emerald-400/10 text-emerald-200"
                      }`}
                    >
                      {evento.encerrado ? "Encerrado" : "Em andamento"}
                    </span>
                  </div>

                  <p className="mt-0.5 text-[11px] leading-4.5 text-slate-300">
                    {evento.descricao}
                  </p>
                  <div className="mt-1.5 grid gap-1 text-[10px] leading-4 text-slate-400 sm:grid-cols-3">
                    <p>Endereço: {evento.endereco}</p>
                    <p>Início: {formatarDataHora(evento.inicioEm)}</p>
                    <p>Fim: {formatarDataHora(evento.fimEm)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default Home;
