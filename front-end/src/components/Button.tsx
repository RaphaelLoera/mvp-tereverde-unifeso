type ButtomType = {
  title: string;
  variante?: "defaut" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ title, variante = "defaut", ...props }: ButtomType) => {
  const buttonVariantes = () => {
    if (variante === "defaut") {
      return "cursor-pointer w-full rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition-colors duration-200 hover:bg-emerald-400 hover:text-slate-950";
    } else if (variante === "outline") {
      return "cursor-pointer w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10";
    }

    return "cursor-pointer w-full rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition-colors duration-200 hover:bg-emerald-400 hover:text-slate-950";
  };

  return (
    <button {...props} className={buttonVariantes()}>
      {title}
    </button>
  );
};

export default Button;
