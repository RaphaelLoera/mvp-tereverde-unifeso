import { socialLinks } from "../data/siteContent";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-white/10 bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h4 className="mb-4 text-center text-sm font-semibold tracking-[0.28em] text-emerald-200 uppercase">
          Contatos
        </h4>
        <div className="flex justify-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800"
            >
              <img src={social.icon} alt={social.label} className="h-5 w-5" />
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
