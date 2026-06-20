import { useEffect, useState } from "react";
import Input from "../Input";
import { useNavigate } from "react-router";
import Button from "../Button";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const ADMIN_EMAILS = new Set(["email@teste.com"]);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("adminAccess");
    if (!storedUser) {
      return;
    }

    try {
      const user = JSON.parse(storedUser) as AuthUser;
      if (user.isAdmin || ADMIN_EMAILS.has(user.email)) {
        navigate("/admin", { replace: true });
        return;
      }
    } catch {
      localStorage.removeItem("adminAccess");
    }
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("Usuário e senha são obrigatórios");
        return;
      }

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 404) {
        setError("Usuário não encontrado");
        return;
      }

      if (response.status === 400) {
        setError("Usuário e senha são obrigatórios");
        return;
      }

      if (response.status === 401) {
        setError("Senha incorreta");
        return;
      }

      if (response.status === 500) {
        setError("Tente novamente mais tarde");
        return;
      }

      if (response.status === 200) {
        setError("");
        const data = await response.json();
        const user = {
          ...(data.user as AuthUser),
          isAdmin:
            Boolean((data.user as AuthUser).isAdmin) ||
            ADMIN_EMAILS.has((data.user as AuthUser).email),
        };
        localStorage.setItem("adminAccess", JSON.stringify(user));
        window.dispatchEvent(new Event("authchange"));
        setShowSuccessPopup(true);
        navigate(user.isAdmin ? "/admin" : "/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <form
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_30%),linear-gradient(180deg,#08111a_0%,#04070c_100%)]"
      onSubmit={handleSubmit}
    >
      <div className="absolute inset-0 bg-[url('/mountain.png')] bg-cover bg-center opacity-10" />
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/35 px-4">
          <div className="w-full max-w-sm rounded-3xl border border-emerald-200/30 bg-slate-950/95 p-6 text-center text-white shadow-[0_30px_80px_rgba(16,185,129,0.28)] backdrop-blur-xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-2xl text-emerald-200">
              ✓
            </div>
            <h2 className="text-xl font-semibold text-white">
              Login realizado com sucesso!
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Seu acesso foi validado com sucesso usando o visual verde da
              página.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccessPopup(false)}
              className="mt-6 w-full rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition-colors duration-200 hover:bg-emerald-400 hover:text-slate-950"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-stretch gap-6 px-4 py-8 sm:px-6 md:grid-cols-2 md:gap-0 lg:px-8 lg:py-10">
        <div className="relative order-1 overflow-hidden rounded-4xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_60px_rgba(16,185,129,0.12)] md:min-h-152 md:rounded-r-none md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.20),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(6,95,70,0.18),transparent_42%)]" />
          <div className="relative flex h-full items-center justify-center">
            <img
              src="/cadeia-de-montanhas%20(1).png"
              alt="Paisagem de montanhas"
              className="mx-auto max-h-128 w-full max-w-[88%] rounded-4xl object-contain shadow-2xl md:max-h-136 md:max-w-[82%]"
            />
          </div>
        </div>

        <div className="relative order-2 mx-auto w-full max-w-md overflow-hidden rounded-4xl border border-white/10 bg-slate-950/75 p-8 shadow-[0_30px_80px_rgba(16,185,129,0.20)] backdrop-blur-xl md:-ml-4 md:min-h-152 md:self-stretch md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.20),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_40%)]" />
          <div className="relative flex h-full flex-col justify-center gap-3">
            <div className="mb-5">
              <p className="text-xs font-semibold tracking-[0.28em] text-emerald-200 uppercase">
                Acesso restrito
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Entrar no Circuito
              </h1>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Use sua conta para acessar a área administrativa ligada ao
                backend do MVP.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3">
              <Input
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />

              <Input
                placeholder="Senha"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-left text-sm text-rose-300">{error}</p>
            </div>

            <Button title="Login" variante="defaut" type="submit" />
            <Button
              title="Não tenho uma conta"
              variante="outline"
              onClick={() => navigate("/register")}
              type="button"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
