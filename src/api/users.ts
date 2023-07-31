import { fetchGet, fetchPost } from "../funciones/fecths"
import { Cliente } from "../types"
import { CLAVE_SERVER_USER_POST } from "../validaciones/env"

export const getAllUser = async () => {
    return await fetchGet("")
}

export const getUserById = async (id:string) => {
    return await fetchGet(id)
}

export const createUser = async (body:Cliente) => {
    const bodyUser = JSON.stringify({clave: CLAVE_SERVER_USER_POST, user: {...body}})
    return await fetchPost("c/" , bodyUser)
}

export const deleteUserById = async (id:string) => {
    return await fetchPost("d/" + id , JSON.stringify({clave: CLAVE_SERVER_USER_POST}))
}