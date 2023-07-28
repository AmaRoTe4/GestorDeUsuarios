import { getUserById } from './../api/users';
import { createUser, getAllUser } from "../api/users";
import { Cliente } from "../types";
import { ValidarUser } from "../validaciones";
import { fechaActual } from "./fechaActual";

export const CrearUser = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const nombre = formData.get('nombre') as string;
    const precio = Number(formData.get('precio')) as number ?? 0;
    const clave = formData.get('clave') as string;
    const telefono = formData.get('telefono') as string;
    const correo = formData.get('correo') as string;
    const local = formData.get('local') as string;
    const direccion = formData.get('direccion') as string;
    const servicio = formData.get('servicio');
    const servidor = formData.get('servidor');
    const id_localidad = formData.get('localidad');
    const vendedor = formData.get('vendedor');
    const fecha = fechaActual();

    const user: Cliente = {
        cliente: {
            nombre,
            telefono,
            correo,
            id_localidad: Number(id_localidad),
            direccion,
            nobre_del_local:local,
            clave:clave,
            salt: ""
        },
        servicios: [
            {
                id_servicio: Number(servicio),
	            inicio_de_actividad: fecha.fecha,
	            coutas_pagadas: [],
	            valor_de_cuotas: precio,
	            id_server: Number(servidor)
            }
        ],
        otros: {},
        estado: false,
        id_vendedor: Number(vendedor)
    }

    if (ValidarUser(user)) return;

    const resultado = await createUser(user);
    
    if(resultado?.error){
        alert("error al subir, mirar consola!")
        console.error(resultado.error)
        return;
    }

    alert("creado")
    form.reset();
}

export const GetAllUser = async () => {
    return await getAllUser()
}

export const GetUserById = async (id:string) => {
    return await getUserById(id)
}