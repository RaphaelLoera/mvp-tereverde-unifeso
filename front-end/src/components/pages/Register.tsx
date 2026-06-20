import { useState } from "react";
import Input from "../Input";
import { useNavigate } from "react-router";
import Button from "../Button";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!name || !email || !password || !confirmPassword) {
        setError("Todos os campos são obrigatórios");
        return;
      }

      if (password !== confirmPassword) {
        setError("As senhas não coincidem");
        return;
      }

      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const responseData = await response.json().catch(() => null);

      if (response.status === 400) {
        setError("Todos os campos são obrigatórios");
        return;
      }

      if (response.status === 409) {
        setError("E-mail já cadastrado");
        return;
      }

      if (response.status === 500) {
        setError("Tente novamente mais tarde");
        return;
      }

      if (response.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setShowSuccessPopup(true);
        console.log(responseData);
        return;
      }

      setError("Ocorreu um erro inesperado");
    } catch (error) {
      console.error(error);
      return;
    }

    //console.log({ name, email, password, confirmPassword, });
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
              Usuário cadastrado com sucesso!
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Seu cadastro foi concluído com a mesma identidade visual verde da
              página.
            </p>
            <button
              type="button"
              onClick={() => {
                setShowSuccessPopup(false);
                navigate("/login");
              }}
              className="mt-6 w-full rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition-colors duration-200 hover:bg-emerald-400 hover:text-slate-950"
            >
              Ir para login
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
                Novo cadastro
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Criar conta
              </h1>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Cadastre-se para entrar e navegar pela área administrativa
                quando necessário.
              </p>
            </div>
            <Input
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Input
              placeholder="E-mail"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              placeholder="Senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Input
              placeholder="Confirme a Senha"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />

            <p className="text-rose-300">{error}</p>

            <div className="mt-3 flex w-full flex-col gap-2">
              <Button title="Criar Conta" type="submit" />

              <Button
                title="Já tenho uma conta"
                variante="outline"
                onClick={() => navigate("/login")}
                type="button"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
