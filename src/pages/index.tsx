/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cliente } from "../types";
import { estadoOfCliente } from "../funciones/estado";
import Eyes from "../svg/eyes.svg";
import Eyesnt from "../svg/eyesnt.svg";
import Delete from "../svg/delete.svg";
import { getAllUser } from "../api/users";
import Menu from "../components/menu";
import { DeleteById } from "../funciones/users";

export default function Main() {
    const navigate = useNavigate();
    const [text, setText] = useState<string>("");
    const [filtro, setFiltro] = useState<number>(-1);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clientesVista, setClientesVista] = useState<Cliente[]>([]);
    const [recarga, setRecarga] = useState<number>(0);

    useEffect(() => {
        cargarClientes();
    }, [recarga])

    const cargarClientes = async () => {
        const aux: Cliente[] = await getAllUser()
        const clienteNew: Cliente[] = aux.map(n => {
            n.estado_vista = estadoOfCliente(n)
            return n;
        })

        setClientes(clienteNew)
        setClientesVista(clienteNew);
    };

    const Buscar = (texto: string = text, filt: number = filtro) => {
        setText(text);
        setFiltro(filt);
        setClientesVista(clientes.filter(n =>
            (n.cliente.nombre.toLowerCase().includes(texto.toLowerCase()) ||
            n.cliente.nobre_del_local.toLowerCase().includes(texto.toLowerCase()))
            && (n.estado_vista === filt || filt === -1)));
    }

    const deleteUser = async (id:string) => {
        if(id === "") return alert("id no valido"); 
        const resultado = await DeleteById(id); 
        setRecarga(n => n + 1)
        alert(resultado)
    }

    return (
        <>
            <Menu />
            <main className="w-screen flex flex-col items-center overflow-x-hidden">
                <nav className="flex items-center justify-between w-full px-5 py-[20px]">
                    <h1 className="text-[30px] text-center w-full m-0 p-0">Clientes of Amaro</h1>
                </nav>
                <Formulario
                    Buscar={Buscar}
                    text={text}
                    filtro={filtro}
                />
                <ul className="noScrollBar flex flex-col items-center w-full py-[20px] overflow-y-scroll overflow-x-hidden max-h-[60vh] gap-4 pb-[100px]">
                    {clientesVista && clientesVista.map((n) =>
                        <li key={n.id}
                            className={`${n.estado_vista === 0 ? "bg-red-600"
                                : n.estado_vista === 1 ? "bg-yellow-600"
                                    : "bg-green-600"
                                } px-4 rounded-sm border border-black min-w-[90%] max-w-[90%] flex justify-between`}
                        >
                            <div className="w-full h-auto py-[10px] hover:cursor-pointer" onClick={e => { e.preventDefault(); navigate(`/user/${n.id}`) }}>
                                <p className="truncate w-full text-lg">
                                    {n?.cliente.nombre}
                                </p>
                                <p className="truncate w-full text-lg">
                                    {n?.cliente.nobre_del_local}
                                </p>
                            </div>
                            <div className="h-auto flex justify-center items-center">
                                <button className="p-4 rounded-lg bg-black" type="button" onClick={() => deleteUser((n.id)?.toString() ?? "")}>
                                    <Delete style={{fill: "white"}} />
                                </button>
                            </div>
                        </li>
                    )}
                </ul>
            </main>
        </>
    )
}

type Funcion = (data: string, filtro?: number) => void;

interface PropsFromulario {
    Buscar: Funcion,
    text: string,
    filtro: number
}

const Formulario = ({ Buscar, text, filtro }: PropsFromulario) => {
    const [filtroVista, setFiltroVista] = useState<boolean>(true);

    return (
        <form onSubmit={e => e.preventDefault()} className="flex flex-col items-center w-full py-[20px]">
            <input
                className="w-[90%] border border-black rounded-xl p-3"
                type="search"
                onChange={e => Buscar(e.target.value)}
            />
            <div className="flex flex-wrap md:flex-nowrap gap-10 items-center justify-center w-full pt-6 pb-4">
                <div className="md:hidden w-full py-1">
                    <button className="px-7" onClick={e => { e.preventDefault(); setFiltroVista(n => !n) }}>
                        {filtroVista ? <Eyes className="h-8" /> : <Eyesnt className="h-8" />}
                    </button>
                </div>
                {filtroVista && <>
                    <div className={`min-w-[150px] flex justify-center items-center rounded-xl ${filtro === -1 ? "bg-green-500" : "bg-slate-300"}`}>
                        <label className="w-full py-3 text-center hover:cursor-pointer hover:opacity-80" htmlFor="Todos">
                            Todos
                        </label>
                        <input onChange={() => Buscar(text, -1)} className="hidden" id="Todos" type="radio" name="filtro" />
                    </div>
                    <div className={`min-w-[150px] flex justify-center items-center rounded-xl ${filtro === 2 ? "bg-green-500" : "bg-slate-300"}`}>
                        <label className="w-full py-3 text-center hover:cursor-pointer hover:opacity-80" htmlFor="Pagados">
                            Pagados
                        </label>
                        <input onChange={() => Buscar(text, 2)} className="hidden" id="Pagados" type="radio" name="filtro" />
                    </div>
                    <div className={`min-w-[150px] flex justify-center items-center rounded-xl ${filtro === 1 ? "bg-green-500" : "bg-slate-300"}`}>
                        <label className="w-full py-3 text-center hover:cursor-pointer hover:opacity-80" htmlFor="Alerta">
                            Alerta
                        </label>
                        <input onChange={() => Buscar(text, 1)} className="hidden" id="Alerta" type="radio" name="filtro" />
                    </div>
                    <div className={`min-w-[150px] flex justify-center items-center rounded-xl ${filtro === 0 ? "bg-green-500" : "bg-slate-300"}`}>
                        <label className="w-full py-3 text-center hover:cursor-pointer hover:opacity-80" htmlFor="Deben">
                            Deben
                        </label>
                        <input onChange={() => Buscar(text, 0)} className="hidden" id="Deben" type="radio" name="filtro" />
                    </div>
                </>}
            </div>
        </form>
    )
}