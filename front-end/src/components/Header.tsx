import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const ADMIN_EMAILS = new Set(["email@teste.com"]);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      const storedUser = localStorage.getItem("adminAccess");

      if (!storedUser) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        return;
      }

      try {
        const user = JSON.parse(storedUser) as AuthUser;
        setIsLoggedIn(true);
        setIsAdmin(Boolean(user.isAdmin) || ADMIN_EMAILS.has(user.email));
      } catch {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("authchange", syncAuthState as EventListener);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("authchange", syncAuthState as EventListener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAccess");
    window.dispatchEvent(new Event("authchange"));
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const painelDestino = location.pathname === "/admin" ? "/" : "/admin";
  const painelTexto =
    location.pathname === "/admin" ? "Home do site" : "Painel admin";

  const navLinks = [
    { to: "/", label: "Início" },
    { to: "/parnaso", label: "PARNASO" },
    { to: "/tres-picos", label: "Três Picos" },
    { to: "/parque-montanhas", label: "Montanhas" },
  ];

  const linkClass = (to: string) =>
    `text-sm font-medium tracking-[0.18em] uppercase transition-colors duration-200 ${
      location.pathname === to
        ? "text-emerald-200"
        : "text-slate-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/tereVerde.png"
            alt="Tere Verde"
            className="h-12 w-12 rounded-full border border-white/10 object-contain"
          />
          <div>
            <span className="block text-sm font-semibold tracking-[0.24em] text-white uppercase">
              Circuito Terê Verde
            </span>
            <span className="text-xs tracking-[0.18em] text-emerald-200 uppercase">
              ecoturismo e gestão
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((item) => (
            <Link key={item.to} to={item.to} className={linkClass(item.to)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <>
              {isAdmin ? (
                <Link
                  to={painelDestino}
                  className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition-colors duration-200 hover:bg-emerald-400 hover:text-slate-950"
                >
                  {painelTexto}
                </Link>
              ) : null}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition-colors duration-200 hover:bg-emerald-400 hover:text-slate-950"
            >
              Entrar
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10 lg:hidden"
          aria-label="Abrir menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-slate-950/95 transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold tracking-[0.14em] text-white uppercase"
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              {isAdmin ? (
                <Link
                  to={painelDestino}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100"
                >
                  {painelTexto}
                </Link>
              ) : null}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
