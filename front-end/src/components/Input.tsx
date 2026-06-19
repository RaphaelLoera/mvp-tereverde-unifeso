
import type { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            {...props}
            className="mx-auto w-64 rounded-md bg-white px-2 py-2 text-sm text-black outline-none"
        />
    );
};

export default Input;