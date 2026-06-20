import { Link } from "react-router";
import type { ParkContent } from "../../data/siteContent";

type ParkPageProps = {
  content: ParkContent;
};

const ParkPage = ({ content }: ParkPageProps) => {
  return (
    <main className="overflow-hidden pb-20 text-slate-100">
      <section className="relative isolate min-h-[72vh] overflow-hidden border-b border-white/10">
        <img
          src={content.heroImage}
          alt={content.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,18,0.12)_0%,rgba(6,10,18,0.72)_70%,rgba(6,10,18,0.92)_100%)]" />
        <div className="relative mx-auto flex min-h-[72vh] w-full max-w-7xl flex-col justify-end px-4 py-16 sm:px-6 lg:px-8">
          <span className="mb-4 inline-flex w-fit rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-emerald-100 uppercase">
            {content.subtitle}
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            {content.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5"
            >
              Acessar painel
            </Link>
            <Link
              to="/"
              className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Voltar para a home
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1.25fr_0.95fr] lg:px-8">
        <div className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.3)] backdrop-blur-xl sm:p-8">
          <h2 className="text-xs font-semibold tracking-[0.3em] text-emerald-200 uppercase">
            {content.biodiversityTitle}
          </h2>
          <div className="mt-5 space-y-5 text-sm leading-7 text-slate-200 sm:text-base">
            {content.biodiversity.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.24)]"
            >
              <div className="flex items-start gap-4">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="h-12 w-12 rounded-2xl bg-white/10 object-contain p-2"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {card.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-4xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.28)] sm:p-8">
          <h2 className="text-2xl font-semibold text-white">
            Informações do parque
          </h2>
          <dl className="mt-6 space-y-5 text-sm leading-7 text-slate-300">
            <div>
              <dt className="text-xs font-semibold tracking-[0.24em] text-emerald-200 uppercase">
                Atividades
              </dt>
              <dd className="mt-2">{content.facts.activities}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.24em] text-emerald-200 uppercase">
                Trilhas
              </dt>
              <dd className="mt-2">{content.facts.trails}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.24em] text-emerald-200 uppercase">
                Canais de atendimento
              </dt>
              <dd className="mt-2">{content.facts.contacts}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.24em] text-emerald-200 uppercase">
                Horário de funcionamento
              </dt>
              <dd className="mt-2">{content.facts.hours}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.24em] text-emerald-200 uppercase">
                Melhor época para visitar
              </dt>
              <dd className="mt-2">{content.facts.bestTime}</dd>
            </div>
          </dl>
        </article>

        <article className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(15,23,42,0.22)]">
          <div className="aspect-4/3 w-full overflow-hidden">
            <iframe
              title={`Mapa de ${content.title}`}
              src={content.mapUrl}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="px-6 py-5 text-sm text-slate-200 sm:px-8">
            Como chegar até o parque e planejar a visita com mais segurança.
          </div>
        </article>
      </section>
    </main>
  );
};

export default ParkPage;
