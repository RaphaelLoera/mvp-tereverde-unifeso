import { useState } from "react";
import Input from "../Input";
import { Link } from "react-router";
import Button from "../Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(email);
    console.log(password);
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
          <Input
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button title="Login" variante="defaut" />
          <Link to="/register" className="w-full">
            <Button title="Não tenho um conta" variante="outline" />
          </Link>

          
        </div>
      </div>
    </form>
  );
};

export default Login;
