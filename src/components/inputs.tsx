import { ReactNode } from "react";

interface props {
    titulo: string,
    id: string,
    type?: string,
    children?: ReactNode;
}

export default function InputGeneral({ titulo, id, type = "text" , children = <></> }: props) {
    return (
        <div className="w-full p-3 md:px-10 flex flex-col justify-center items-center">
            <label className="w-full md:w-[400px] text-[18px]" >{titulo}</label>
            <input 
                name={id}
                className="w-full md:w-[400px] rounded-lg px-2 py-1 text-[18px] border border-black" 
                id={id} 
                type={type} 
            />
            {children}
        </div>
    )
}