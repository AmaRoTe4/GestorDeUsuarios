/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cliente } from "../types";
import { estadoOfCliente } from "../funciones/estado";
import DatosClientes from "../data/clientes.json";
import Eyes from "../svg/eyes.svg";
import Eyesnt from "../svg/eyesnt.svg";
import Menu from "../svg/menu.svg";
import Add from "../svg/add.svg";
import Delete from "../svg/delete.svg";

export default function Main() {
    const navigate = useNavigate();
    const [text, setText] = useState<string>("");
    const [filtroVista, setFiltroVista] = useState<boolean>(true);
    const [menuVista, setMenuVista] = useState<boolean>(false);
    const [filtro, setFiltro] = useState<number>(-1);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clientesVista, setClientesVista] = useState<Cliente[]>([]);

    useEffect(() => {
        cargarClientes();
    }, [])

    const cargarClientes = () => {
        //@ts-ignore
        const aux: Cliente[] = [...DatosClientes]
        const clienteNew: Cliente[] = aux.map(n => {
            n.estado_vista = estadoOfCliente(n)
            return n;
        })

        setClientes(clienteNew)
        setClientesVista(clienteNew);
    };

    const Buscar = (texto:string = text , filt:number = filtro) => {
        setText(text);
        setFiltro(filt);
        setClientesVista(clientes.filter(n =>
            n.nombre_usuario.toLowerCase().includes(texto.toLowerCase())
            && (n.estado_vista === filt || filt === -1)));
    }

    return (
        <>
            <MenuIndex vista={menuVista} setVista={setMenuVista} />
            <main className="w-screen flex flex-col items-center overflow-x-hidden">
                <nav className="flex items-center justify-between w-full px-5 py-[20px]">
                    {/* @ts-ignore */}
                    <Menu className="opacity-0" style={{ height: 30 }} />
                    <h1 className="text-[30px] text-center">Clientes of Amaro</h1>
                    <button className="hover:cursor-pointer hover:opacity-70"
                        style={{ height: 30 }}
                        onClick={(e) => { e.preventDefault(); setMenuVista(n => !n) }}>
                        {/* @ts-ignore */}
                        <Menu style={{ height: 30 }} />
                    </button>
                </nav>
                <form onSubmit={e => e.preventDefault()} className="flex flex-col items-center w-full py-[20px]">
                    <input
                        className="w-[90%] border border-black rounded-xl p-3"
                        type="search"
                        onChange={e => Buscar(e.target.value)}
                    />
                    <div className="flex flex-wrap md:flex-nowrap gap-10 items-center justify-center w-full pt-6 pb-4">
                        <div className="md:hidden w-full py-1">
                            <button className="px-7" onClick={e => { e.preventDefault(); setFiltroVista(n => !n) }}>
                                {/* @ts-ignore */}
                                {filtroVista ? <Eyes className="h-8" /> : <Eyesnt className="h-8" />}
                            </button>
                        </div>
                        {filtroVista && <>
                            <div>
                                <label className={`px-[50px] py-3 rounded-xl hover:cursor-pointer ${filtro === -1 ? "bg-green-500" : "bg-slate-300"}`} htmlFor="Todos">
                                    Todos
                                </label>
                                <input onChange={() => Buscar(text, -1)} className="hidden" id="Todos" type="radio" name="filtro" />
                            </div>
                            <div>
                                <label className={`px-[50px] py-3 rounded-xl hover:cursor-pointer ${filtro === 2 ? "bg-green-500" : "bg-slate-300"}`} htmlFor="Pagados">
                                    Pagados
                                </label>
                                <input onChange={() => Buscar(text, 2)} className="hidden" id="Pagados" type="radio" name="filtro" />
                            </div>
                            <div>
                                <label className={`px-[50px] py-3 rounded-xl hover:cursor-pointer ${filtro === 1 ? "bg-green-500" : "bg-slate-300"}`} htmlFor="Alerta">
                                    Alerta
                                </label>
                                <input onChange={() => Buscar(text, 1)} className="hidden" id="Alerta" type="radio" name="filtro" />
                            </div>
                            <div>
                                <label className={`px-[50px] py-3 rounded-xl hover:cursor-pointer ${filtro === 0 ? "bg-green-500" : "bg-slate-300"}`} htmlFor="Deben">
                                    Deben
                                </label>
                                <input onChange={() => Buscar(text, 0)} className="hidden" id="Deben" type="radio" name="filtro" />
                            </div>
                        </>}
                    </div>
                </form>
                <ul className="noScrollBar flex flex-col items-center w-full py-[20px] overflow-y-scroll overflow-x-hidden max-h-[60vh] gap-4 pb-[100px]">
                    {clientesVista && clientesVista.map((n) =>
                        <li key={n.id}
                            className={`${n.estado_vista === 0 ? "bg-red-600"
                                : n.estado_vista === 1 ? "bg-yellow-600"
                                    : "bg-green-600"
                                } py-[10px] px-4 rounded-sm border border-black min-w-[90%] max-w-[90%] hover:cursor-pointer hover:opacity-70`}
                            onClick={e => { e.preventDefault(); navigate(`/user/${n.id}`) }}
                        >
                            <p className="truncate">
                                {n.nombre_usuario}
                            </p>
                        </li>
                    )}
                </ul>
            </main>
        </>
    )
}

interface Props {
    vista: boolean
    setVista: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuIndex = ({ vista, setVista }: Props) => {
    return (
        <section className={`
            ${vista ? "" : "translate-x-[-80vw] md:translate-x-[-30vw]"}
            transition-all ease-linear duration-200
            border-e border-black w-[80vw] md:w-[30vw] h-screen absolute z-100 bg-white top-0
        `}>
            <div className="py-5 w-full flex items-center justify-between">
                {/* @ts-ignore */}
                <Add className="opacity-0 ps-5 h-[30px]" />
                <h3 className="text-[25px] text-center h-[20px]">Funciones</h3>
                {/* @ts-ignore */}
                <button className="pe-5 h-[30px] hover:cursor-pointer" onClick={e => { e.preventDefault(); setVista(n => !n) }}>
                    {/* @ts-ignore */}
                    <Delete style={{height: "30px"}} />
                </button>
            </div>
            <article className="py-5 w-full flex flex-col gap-7 items-center justify-center">
                <div className="w-[200px] gap-3 flex flex-col items-center">
                    <button className="p-5 border border-black rounded-xl">Agrear nuevo servicio</button>
                </div>
                <div className="w-[200px] gap-3 flex flex-col items-center">
                    <Link to="/user/Add" className="p-5 border border-black rounded-xl">Agrear nuevo cliente</Link>
                </div>
            </article>
        </section>
    )
}