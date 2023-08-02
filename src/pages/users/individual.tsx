import { useNavigate, useParams } from "react-router-dom";
import { GetUserById, UpdateUserById } from "../../funciones/users";
import { Cliente } from "../../types";
import { useEffect, useState } from "react";
import Menu from "../../components/menu";
import { estadoOfCliente } from "../../funciones/estado";
import { ValuesApp } from "../../types.d"
import { fechaActual } from "../../funciones/fechaActual";
import { cartelError, cartelSuccess, cartelValidacion } from "../../components/carteles";

export default function UserForId() {
    const navigate = useNavigate()
    const { id } = useParams();
    if (!id) {
        navigate("/")
        return <></>
    }
    const [user, setUser] = useState<Cliente | null>(null)

    useEffect(() => {
        obtenerUser()
    }, [])

    const obtenerUser = async () => {
        const resultado = await GetUserById(id)
        if (!resultado) navigate("/");
        setUser(resultado)
    }

    const agregarCuota = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!user) return;

        const fecha: { fecha: string, hora: string } = fechaActual();
        const fecha_de_pago = fecha.fecha + "/" + fecha.hora

        if (user?.servicios[0].coutas_pagadas.length === 0) {
            const today = new Date();
            const mes: number = today.getMonth() + 1;
            const anio: number = today.getFullYear();
            const newCuota = {
                mes,
                anio,
                fecha_de_pago,
            }
            setUser({
                ...user,
                servicios: [
                    {
                        ...user.servicios[0],
                        coutas_pagadas: [newCuota]
                    }
                ]
            })
        } else {
            const indice = user.servicios[0].coutas_pagadas.length - 1;
            let mes = user.servicios[0].coutas_pagadas[indice].mes
            let anio = user.servicios[0].coutas_pagadas[indice].anio

            if (mes !== 12) mes++
            else {
                mes = 1
                anio++
            }


            setUser({
                ...user,
                servicios: [
                    {
                        ...user.servicios[0],
                        coutas_pagadas: [...user.servicios[0].coutas_pagadas, {
                            fecha_de_pago,
                            anio,
                            mes
                        }]
                    }
                ]
            })
        }

        return
    }

    const removeCuota = () => {
        if(!user) return;
        if(user?.servicios[0].coutas_pagadas.length === 0) return;
        let newCuotas = [...user?.servicios[0].coutas_pagadas]
        newCuotas.pop();

        setUser({
            ...user,
            servicios: [
                {
                    ...user.servicios[0],
                    coutas_pagadas: [...newCuotas]
                }
            ]
        })
    }

    const AgregarEnBaseDeDatos = async () => {
        if(!user) return cartelError("User no existe!")
        const resultado = await UpdateUserById(user)
        if(resultado) cartelSuccess("Modificacion realizada con exito!!!")
        else cartelError("Error al modificar en la base de datos!")
    }

    return (
        <>
            <Menu />
            {user &&
                <main className="flex flex-col gap-5 md:flex-row w-screen p-5">
                    <DatosUser
                        setUser={setUser}
                        user={user}
                    />
                    <DatosService
                        setUser={setUser}
                        user={user}
                        addCuota={agregarCuota}
                        removeCuota={removeCuota}
                    />
                </main>}
            <div className="flex flex-col max-w-[200px] ms-5">
                <label>Base de datos</label>
                <button
                    className="bg-green-600 p-3 rounded-sm min-w-[200px]"
                    onClick={e => { e.preventDefault; AgregarEnBaseDeDatos() }}
                >
                    Guardar
                </button>
            </div>
        </>
    )
}

interface propsDatosPersonal {
    user: Cliente | null
    setUser: React.Dispatch<React.SetStateAction<Cliente | null>>
    addCuota?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    removeCuota?: () => void
}

const DatosUser = ({ user, setUser }: propsDatosPersonal) => {
    const [formulario, setFormulario] = useState({
        nombre: user?.cliente.nombre,
        nobre_del_local: user?.cliente.nobre_del_local,
        telefono: user?.cliente.telefono,
        correo: user?.cliente.correo,
        direccion: user?.cliente.direccion,
        estado: user?.estado.toString(),
        id_vendedor: user?.id_vendedor,
        id_localidad: user?.cliente.id_localidad,
    })

    const guardarCambios = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user) return

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const nombre = formData.get("nombre") as string
        const nobre_del_local = formData.get("nobre_del_local") as string
        const telefono = formData.get("telefono") as string
        const correo = formData.get("correo") as string
        const direccion = formData.get("direccion") as string
        const estado = formData.get("estado") as string
        const vendedor = Number(formData.get("id_vendedor")) as number
        const id_localidad = Number(formData.get("id_localidad")) as number

        setUser({
            ...user,
            cliente: {
                ...user?.cliente,
                nombre,
                telefono,
                correo,
                id_localidad,
                direccion,
                nobre_del_local,
            },
            estado: estado === "true",
            id_vendedor: vendedor,
        })
    }

    const handleChange = (event: React.ChangeEvent<any>) => {
        const { name, value } = event.target;
        setFormulario({ ...formulario, [name]: value });
    };

    if (!user) return <></>
    return (
        <div className="w-full md:w-[50%] p-3 flex flex-col gap-2 bg-gray-500 rounded-md">
            <h2 className="text-white text-3xl">Informacion del usuario: </h2>
            <form className="flex flex-col gap-1" onSubmit={(e) => guardarCambios(e)}>
                <p className="text-xl text-white flex gap-1 p-[2px] items-center">
                    <span className="font-bold text-black min-w-[200px]">id: </span> {user?.id}
                </p>
                <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                    <span className="font-bold text-black min-w-[200px]">nombre: </span>
                    <input
                        type="text"
                        className="text-white bg-inherit border-inherit focus:border focus:border-black" name="nombre"
                        id="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                    <span className="font-bold text-black min-w-[200px]">nombre del local: </span>
                    <input
                        type="text"
                        className="text-white bg-inherit border-inherit focus:border focus:border-black"
                        name="nobre_del_local"
                        id="nobre_del_local"
                        value={formulario.nobre_del_local}
                        onChange={handleChange}
                    />
                </div>
                <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                    <span className="font-bold text-black min-w-[200px]">direccion: </span>
                    <input
                        type="text"
                        className="text-white bg-inherit border-inherit focus:border focus:border-black" name="direccion"
                        id="direccion"
                        value={formulario.direccion}
                        onChange={handleChange}
                    />
                </div>
                <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                    <span className="font-bold text-black min-w-[200px]">telefono: </span>
                    <input
                        type="text"
                        className="text-white bg-inherit border-inherit focus:border focus:border-black" name="telefono"
                        id="telefono"
                        value={formulario.telefono}
                        onChange={handleChange}
                    />
                </div>
                <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                    <span className="font-bold text-black min-w-[200px]">correo electronico: </span>
                    <input
                        type="text"
                        className="text-white bg-inherit border-inherit focus:border focus:border-black" name="correo"
                        id="correo"
                        onChange={handleChange}
                        value={formulario.correo}
                    />
                </div>
                <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                    <span className="font-bold text-black min-w-[200px]">estado: </span>
                    <select onChange={handleChange} name="estado" className="text-white bg-inherit border-inherit focus:border focus:border-black flex flex-col gap-2 p-1 min-w-[200px]">
                        <option value=""></option>
                        <option
                            selected={formulario.estado === "true"}
                            className="text-black"
                            value={"true"}
                        >
                            true
                        </option>
                        <option
                            selected={formulario.estado === "false"}
                            className="text-black"
                            value={"false"}
                        >
                            false
                        </option>
                    </select>
                </div>
                <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                    <span className="font-bold text-black min-w-[200px]">vendedor: </span>
                    <select onChange={handleChange} name="id_vendedor" className="text-white bg-inherit border-inherit focus:border focus:border-black flex flex-col gap-2 p-1 min-w-[200px]">
                        <option value=""></option>
                        {ValuesApp.vendedores.map((m) => (
                            <option
                                selected={m.id === formulario.id_vendedor}
                                key={m.id}
                                className="text-black"
                                value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                    <span className="font-bold text-black min-w-[200px]">localidad: </span>
                    <select onChange={handleChange} name="id_localidad" className="text-white bg-inherit border-inherit focus:border focus:border-black flex flex-col gap-2 p-1 min-w-[200px]">
                        <option value=""></option>
                        {ValuesApp.localidad.map((m) => (
                            <option
                                selected={m.id === formulario.id_localidad}
                                key={m.id}
                                className="text-black"
                                value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-full py-1 flex justify-end items-center">
                    <button className="bg-lime-500 p-4 rounded-lg min-w-[200px]">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    )
}

const DatosService = ({ user, setUser, addCuota , removeCuota }: propsDatosPersonal) => {
    const [formulario, setFormulario] = useState({
        valor_de_cuotas: user?.servicios[0].valor_de_cuotas,
        id_servicio: user?.servicios[0].id_servicio,
        id_server: user?.servicios[0].id_server,
        inicio_de_actividad: user?.servicios[0].inicio_de_actividad,
    })

    const guardarCambios = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user) return

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const valor_de_cuotas = Number(formData.get("valor_de_cuotas")) as number
        const id_servicio = Number(formData.get("id_servicio")) as number
        const id_server = Number(formData.get("id_server")) as number
        const inicio_de_actividad = formData.get("inicio_de_actividad") as string

        setUser({
            ...user,
            servicios: [
                {
                    ...user.servicios[0],
                    inicio_de_actividad,
                    valor_de_cuotas,
                    id_server,
                    id_servicio
                }
            ]
        })
    }

    const handleChange = (event: React.ChangeEvent<any>) => {
        const { name, value } = event.target;
        setFormulario({ ...formulario, [name]: value });
    };

    if (!user || !addCuota || !removeCuota) return <></>
    return (
        <div className="w-full md:w-[50%] p-3 flex flex-col gap-2 bg-gray-500 rounded-md">
            <h2 className="text-white text-3xl">Informacion de los servicios: </h2>
            {user.servicios.map((n, i) => (
                <form className="flex flex-col gap-1" key={i} onSubmit={(e) => guardarCambios(e)}>
                    <p className="text-xl text-white flex gap-1 p-[2px] items-center">
                        <span className="font-bold text-black min-w-[200px]">id: </span> {i + 1}
                    </p>
                    <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                        <label className="font-bold text-black min-w-[200px]">inicio de actividad: </label>
                        <input
                            type="string"
                            className="text-white bg-inherit border-inherit focus:border focus:border-black" name="inicio_de_actividad"
                            id="inicio_de_actividad"
                            value={formulario.inicio_de_actividad}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                        <label className="font-bold text-black min-w-[200px]">valor de cuota: </label>
                        <input
                            type="number"
                            className="text-white bg-inherit border-inherit focus:border focus:border-black" name="valor_de_cuotas"
                            id="valor_de_cuotas"
                            value={formulario.valor_de_cuotas}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                        <label className="font-bold text-black min-w-[200px]">servicio: </label>
                        <select name="id_servicio" className="text-white bg-inherit border-inherit focus:border focus:border-black flex flex-col gap-2 p-1 min-w-[200px]">
                            <option value=""></option>
                            {ValuesApp.servicio.map((m) => (
                                <option
                                    key={m.id}
                                    selected={formulario.id_servicio === m.id}
                                    className="text-black"
                                    value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                        <label className="font-bold text-black min-w-[200px]">server: </label>
                        <select name="id_server" className="text-white bg-inherit border-inherit focus:border focus:border-black flex flex-col gap-2 p-1 min-w-[200px]">
                            <option value=""></option>
                            {ValuesApp.servidor.map((m) => (
                                <option
                                    key={m.id}
                                    selected={formulario.id_server === m.id}
                                    className="text-black"
                                    value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="text-xl text-white flex gap-1 p-[2px] items-center">
                        <label className="font-bold text-black min-w-[200px]">coutas: </label>
                        <div className="flex gap-5">
                            <p>cantidad pagada: {n.coutas_pagadas.length}</p>
                            <select name="coutas_pagadas" className="text-white bg-inherit border-inherit focus:border focus:border-black flex flex-col gap-2 p-1 min-w-[200px]">
                                {n.coutas_pagadas.map((m, y) => (
                                    <option className="text-black" key={y} selected={y === 0}>{m.fecha_de_pago}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-full py-1 gap-10 flex justify-end items-center">
                        <button type="button" onClick={e => addCuota(e)} className="bg-lime-500 p-4 rounded-lg min-w-[200px]">
                            Agregar Cuota
                        </button>
                        <button type="button" onClick={() => removeCuota()} className="bg-lime-500 p-4 rounded-lg min-w-[200px]">
                            Remove Cuota
                        </button>
                    </div>
                    <div className="w-full py-1 gap-10 flex justify-end items-center">
                        <button type="submit" className="bg-lime-500 p-4 rounded-lg min-w-[200px]">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            )
            )}
        </div>
    )
}