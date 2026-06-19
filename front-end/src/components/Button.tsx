type ButtomType = {
    title: string;
    variante?: "defaut" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;


const Button = ({ title, variante = "defaut", ...props }: ButtomType) => {
    //const default = "cursor-pointer w-full rounded-md bg-red-600 py-1 text-white text-sm"
    //const outLine = "cursor-pointer w-full rounded-md bg-white py-1 text-black text-sm"

    const buttonVariantes = () => {
        if (variante === "defaut") {
            return "cursor-pointer w-full rounded-md bg-red-600 py-1 text-white text-sm"
        } else if (variante === "outline") {
            return "cursor-pointer w-full rounded-md bg-white py-1 text-black text-sm"
        }
    }

    return (
        <button {...props} className= {buttonVariantes()}>
            {title}
        </button>
    );
}

export default Button;