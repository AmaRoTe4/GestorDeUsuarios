import MenuHamburguesa from "../svg/menu.svg";
import Add from "../svg/add.svg";
import Delete from "../svg/delete.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
    const [vista, setVista] = useState<boolean>(false);

    return (
        <>
            <button className="hover:cursor-pointer hover:opacity-70 absolute top-5 right-7"
                style={{ height: 30 }}
                onClick={(e) => { e.preventDefault(); setVista(n => !n) }}>
                <MenuHamburguesa style={{ height: 30 }} />
            </button>
            <section className={`
            ${vista ? "" : "translate-x-[-80vw] md:translate-x-[-30vw]"}
            transition-all ease-linear duration-200
            border-e border-black w-[80vw] md:w-[30vw] h-screen absolute z-100 bg-white top-0
        `}>
                <div className="py-5 w-full flex items-center justify-between">
                    <Add className="opacity-0 ps-5 h-[25px]" />
                    <h3 className="text-[25px] text-center h-[25px] flex justify-center items-center">Funciones</h3>
                    <button className="pe-5 h-[25px] flex justify-center items-center hover:cursor-pointer"
                        onClick={e => { e.preventDefault(); setVista(n => !n) }}
                    >
                        <Delete style={{ height: "25px" }} />
                    </button>
                </div>
                <article className="py-5 w-full flex flex-col gap-7 items-center justify-center">
                    <div className="flex flex-col items-center w-[80%]">
                        <Link to="/" className="p-5 w-[100%] border text-center border-black rounded-xl">Inicio</Link>
                    </div>
                    <div className="flex flex-col items-center w-[80%]">
                        <button className="p-5 w-[100%] border text-center border-black rounded-xl">Agrear servicio</button>
                    </div>
                    <div className="flex flex-col items-center w-[80%]">
                        <button className="p-5 w-[100%] border text-center border-black rounded-xl">Agrear servidor</button>
                    </div>
                    <div className="flex flex-col items-center w-[80%]">
                        <button className="p-5 w-[100%] border text-center border-black rounded-xl">Agregar localidad</button>
                    </div>
                    <div className="flex flex-col items-center w-[80%]">
                        <Link to="/user/Add" className="p-5 w-[100%] border text-center border-black rounded-xl">Agrear cliente</Link>
                    </div>
                </article>
            </section>
        </>
    )
}