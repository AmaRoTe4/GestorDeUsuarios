/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link } from "react-router-dom";
import { fechaActual } from "../../funciones/fechaActual";
import { Cliente } from "../../types";
import FlechaLeft from "../../svg/flechaLeft.svg";

export default function AddUser() {
    const automaticClave = () => {
        const newClave = btoa(((Math.random() * 1000000) * (Math.random() * 1000000) * (Math.random() * 1000000) * (Math.random() / (new Date).getMilliseconds())).toString());
        const inputClave = document.getElementById('clave') as HTMLInputElement;
        if (!inputClave) return;

        inputClave.value = newClave;
    }

    const validarUser = (user: Cliente): boolean => {
        let retorno = false;
        if (!user.clave || user.clave === "") {
            alert("Clave no valida");
            retorno = true;
        }
        if (!user.nombre_usuario || user.nombre_usuario === "") {
            alert("El nombre no es valido")
            retorno = true;
        }
        if (!user.telefono || user.telefono === ""){
            alert("El telefono no es valido")
            retorno = true;
        }
        if (!user.correo_electronico || user.correo_electronico === ""){
            alert("El correo no es valido")
            retorno = true;
        }

        return retorno
    }

    const CrearUser = () => {
        const input_nombre_usuario = document.getElementById('nombre') as HTMLInputElement;
        const input_clave = document.getElementById('clave') as HTMLInputElement;
        const input_telefono = document.getElementById('telefono') as HTMLInputElement;
        const input_correo = document.getElementById('correo') as HTMLInputElement;
        const select_servicio = document.getElementById('servicio') as HTMLInputElement;
        if (!select_servicio || !input_nombre_usuario || !input_clave || !input_telefono || !input_correo) return;

        const user: Cliente = {
            id: "",
            clave: input_clave.value,
            nombre_usuario: input_nombre_usuario.value,
            telefono: input_telefono.value,
            correo_electronico: input_correo.value,
            servicio: select_servicio.value === "base" ? 2 : select_servicio.value === "prueba" ? 1 : 0,
            estado: 0,
            otros: {},
            inicio_de_actividad: fechaActual().fecha,
            cuotas_pagadas: [],
        }

        if(validarUser(user)) return;
    }

    return (
        <main className="w-screen flex flex-col">
            <div className="flex items-center">
                <Link to="/" className="px-4 py-2 w-[100px]">
                    <FlechaLeft 
                        //@ts-ignore
                        style={{height: 30}} 
                    />
                </Link>
                <h1 className="text-[25px] text-center w-full py-5">Agregar usuarios</h1>
                <div className="px-4 py-2 w-[100px] opacity-0">
                    <FlechaLeft 
                        //@ts-ignore
                        style={{height: 30}} 
                    />
                </div>
            </div>
            <form onSubmit={e => { e.preventDefault(); }} className="w-full py-5 flex flex-col items-center">
                <div className="w-full p-3 md:px-10 flex flex-col justify-center items-center">
                    <label className="w-full md:w-[400px] text-[18px]" >Nombre de usuario</label>
                    <input className="w-full md:w-[400px] rounded-lg px-2 py-1 text-[18px] border border-black" id="nombre" type="text" />
                </div>
                <div className="w-full p-3 md:px-10 flex flex-col justify-center items-center">
                    <label className="w-full md:w-[400px] text-[18px]" >Telefono</label>
                    <input className="w-full md:w-[400px] rounded-lg px-2 py-1 text-[18px] border border-black" id="telefono" type="text" />
                </div>
                <div className="w-full p-3 md:px-10 flex flex-col justify-center items-center">
                    <label className="w-full md:w-[400px] text-[18px]" >Correo</label>
                    <input className="w-full md:w-[400px] rounded-lg px-2 py-1 text-[18px] border border-black" id="correo" type="email" />
                </div>
                <div className="w-full p-3 md:px-10 flex flex-col justify-center items-center">
                    <label className="w-full md:w-[400px] text-[18px]" >Clave</label>
                    <div className="gap-5 flex w-full md:w-[400px]">
                        <input className="w-full rounded-lg px-2 py-1 text-[18px] border border-black" id="clave" type="text" />
                        <button className="p-2 rounded-lg bg-blue-500 w-[25%] border border-black" onClick={e => { e.preventDefault(); automaticClave() }}>
                            Automatic
                        </button>
                    </div>
                </div>
                <div className="w-full p-3 md:px-10 flex flex-col justify-center items-center">
                    <label className="w-full md:w-[400px] text-[18px]" >Servicio</label>
                    <select id="servicio" className="w-full md:w-[400px] rounded-lg py-3 px-1 border border-black">
                        <option className="p-0" value=""></option>
                        <option className="p-0" value="base">Base</option>
                        <option className="p-0" value="prueba">Prueba</option>
                    </select>
                </div>
                <div className="w-full p-3 md:px-10 mt-3 flex flex-col justify-center items-center">
                    <button
                        onClick={e => { e.preventDefault(); CrearUser() }}
                        className="bg-green-500 w-[95%] md:w-[400px] py-3 rounded-lg border border-black" >Crear</button>
                </div>
            </form>
        </main>
    )
}