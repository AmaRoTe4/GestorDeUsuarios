import { PASSWORD_LOGIN } from "./env"

export const validarLogin = (text:string):boolean => {
    return PASSWORD_LOGIN === text
}

export const Estado = ():boolean => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}")
    const id = user?.id
    return id === PASSWORD_LOGIN
}