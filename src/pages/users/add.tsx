/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link } from "react-router-dom";
import FlechaLeft from "../../svg/flechaLeft.svg";
import InputGeneral from "../../components/inputs";
import { CrearUser } from "../../funciones/users";
import Menu from "../../components/menu";

export default function AddUser() {
    const automaticClave = () => {
        const newClave = btoa(((Math.random() * 1000000) * (Math.random() * 1000000) * (Math.random() * 1000000) * (Math.random() / (new Date).getMilliseconds())).toString());
        const inputClave = document.getElementById('clave') as HTMLInputElement;
        if (!inputClave) return;

        inputClave.value = newClave;
    }

    return (
        <>
            <Menu />
            <main className="w-screen flex flex-col">
                <div className="flex items-center">
                    <h1 className="text-[25px] text-center w-full py-5">Agregar usuarios</h1>
                </div>
                <form onSubmit={e => CrearUser(e)} className="w-full py-5 flex flex-col items-center">
                    <InputGeneral
                        titulo="Nombre de usuario"
                        id="nombre"
                    />
                    <InputGeneral
                        titulo="Nombre del local"
                        id="local"
                    />
                    <InputGeneral
                        titulo="Direccion del local"
                        id="direccion"
                    />
                    <InputGeneral
                        titulo="Telefono"
                        id="telefono"
                    />
                    <InputGeneral
                        titulo="Correo"
                        id="correo"
                        type="email"
                    />
                    <div className="w-full p-3 md:px-10 flex flex-col justify-center items-center">
                        <label className="w-full md:w-[400px] text-[18px]" >Clave</label>
                        <div className="gap-5 flex w-full md:w-[400px]">
                            <input className="w-full rounded-lg px-2 py-1 text-[18px] border border-black" id="clave" type="text" name="clave" />
                            <button className="p-2 rounded-lg bg-blue-500 w-[25%] border border-black" onClick={e => { e.preventDefault(); automaticClave() }}>
                                Automatic
                            </button>
                        </div>
                    </div>
                    <InputGeneral
                        titulo="Precio"
                        id="precio"
                        type="number"
                    />
                    <div className="w-full p-3 md:px-10 flex flex-col justify-center items-center">
                        <label className="w-full md:w-[400px] text-[18px]" >Servicio</label>
                        <select id="servicio" name="servicio" className="w-full md:w-[400px] rounded-lg py-3 px-1 border border-black">
                            <option className="p-0" value=""></option>
                            <option className="p-0" value={1}>Prueba</option>
                            <option className="p-0" value={2}>Base</option>
                        </select>
                    </div>
                    <div className="w-full p-3 md:px-10 flex flex-col justify-center items-center">
                        <label className="w-full md:w-[400px] text-[18px]" >Servidor</label>
                        <select id="servidor" name="servidor" className="w-full md:w-[400px] rounded-lg py-3 px-1 border border-black">
                            <option className="p-0" value=""></option>
                            <option className="p-0" value={1}>1</option>
                        </select>
                    </div>
                    <div className="w-full p-3 md:px-10 flex flex-col justify-center items-center">
                        <label className="w-full md:w-[400px] text-[18px]" >Localidad</label>
                        <select id="localidad" name="localidad" className="w-full md:w-[400px] rounded-lg py-3 px-1 border border-black">
                            <option className="p-0" value=""></option>
                            <option className="p-0" value={1}>Malabrigo</option>
                            <option className="p-0" value={2}>Reconquista</option>
                            <option className="p-0" value={3}>Avellaneda</option>
                        </select>
                    </div>
                    <div className="w-full p-3 md:px-10 flex flex-col justify-center items-center">
                        <label className="w-full md:w-[400px] text-[18px]" >Vendedor</label>
                        <select id="vendedor" name="vendedor" className="w-full md:w-[400px] rounded-lg py-3 px-1 border border-black">
                            <option className="p-0" value=""></option>
                            <option className="p-0" value={1}>Amaro Cattarozzi</option>
                        </select>
                    </div>
                    <div className="w-full p-3 md:px-10 mt-3 flex flex-col justify-center items-center">
                        <button
                            type="submit"
                            className="bg-green-500 w-[95%] md:w-[400px] py-3 rounded-lg border border-black" >
                            Crear
                        </button>
                    </div>
                </form>
            </main>
        </>
    )
}