import { useState } from "react";
import Input from "../Input";
import { Link } from "react-router";
import Button from "../Button";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmCep, setConfirmCep] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ nome, email, password, confirmPassword, confirmCep });
  }

  return (
    <form
      className="flex h-screen w-full items-center justify-center bg-black"
      onSubmit={handleSubmit}
    >
      <div className="mx-auto w-full max-w-md rounded-lg p-4">
        <Link to="/">
          <img src="/mountain.png" alt="Logo" className="mx-auto mb-4 block" />
        </Link>

        <div className="flex w-full flex-col gap-3">
          <Input placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
          <Input
            placeholder="E-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirme a Senha"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Input
            placeholder="CEP"
            type="text"
            onChange={(e) => setConfirmCep(e.target.value)}
          />

          <Button title="Criar Conta" variante="defaut" />
          <Link to="/login" className="w-full">
          <Button title="Já tenho uma conta" variante="outline" />
          </Link>

        </div>
      </div>
    </form>
  );
};

export default Register;
