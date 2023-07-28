import { useNavigate, useParams } from "react-router-dom";
import { GetUserById } from "../../funciones/users";
import { Cliente } from "../../types";
import { useEffect, useState } from "react";
import Menu from "../../components/menu";
import { estadoOfCliente } from "../../funciones/estado";

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

    return (
        <>
            <Menu />
            <main className="flex flex-col gap-5 md:flex-row w-screen p-5">
                <DatosUser user={user} />
                <div className="w-full md:w-[50%] bg-gray-100">
                    actions
                </div>
            </main>
        </>
    )
}

interface propsDatosPersonal{
    user:Cliente | null
}

const DatosUser = ({ user }:propsDatosPersonal) => {
    if(!user) return <></>
    return (
        <div className="w-full md:w-[50%] p-3 flex flex-col gap-2 bg-gray-500 rounded-md">
            <h2 className="text-white text-3xl">Informacion del usuario: </h2>
            <span className="flex flex-col gap-1">
                <p className="text-xl text-white flex truncate">
                    <span className="font-bold text-black min-w-[200px]">id: </span> {user?.id}
                </p>
                <p className="text-xl text-white flex truncate">
                    <span className="font-bold text-black min-w-[200px]">nombre: </span> {user?.cliente.nombre}
                </p>
                <p className="text-xl text-white flex truncate">
                    <span className="font-bold text-black min-w-[200px]">nombre del local: </span> {user?.cliente.nobre_del_local}
                </p>
                <p className="text-xl text-white flex truncate">
                    <span className="font-bold text-black min-w-[200px]">telefono: </span> {user?.cliente.telefono}
                </p>
                <p className="text-xl text-white flex truncate">
                    <span className="font-bold text-black min-w-[200px]">correo electronico: </span> {user?.cliente.correo}
                </p>
                <p className="text-xl text-white flex truncate">
                    <span className="font-bold text-black min-w-[200px]">estado: </span> {(user?.estado ?? false) ? "Desactivo" : "Activo"}
                </p>
                <p className="text-xl text-white flex truncate">
                    <span className="font-bold text-black min-w-[200px]">vendedor: </span> {user?.id_vendedor}
                </p>
                <p className="text-xl text-white flex truncate">
                    <span className="font-bold text-black min-w-[200px]">localidad: </span> {user?.cliente.id_localidad}
                </p>
            </span>
        </div>
    )
}