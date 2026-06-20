import type { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors duration-200 outline-none placeholder:text-slate-400 focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-400/15"
    />
  );
};

export default Input;
