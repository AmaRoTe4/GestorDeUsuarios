import { Cliente } from "../types";
import { fechaActual, separarStringPorSlash } from "./fechaActual";

// 0 -> debe y paso el plazo
// 1 -> debe pero esta en los tres dias
// 2 -> pagado
export const estadoOfCliente = (cliente:Cliente):number => {
    const [dia , mes , anio] = separarStringPorSlash(fechaActual().fecha);
    const [diaInicio , mesInicio , anioInicio] = separarStringPorSlash(cliente.inicio_de_actividad)
    
    const deudaAnual:number = (Number(anio) - Number(anioInicio))
    const deudaMensual:number = (Number(mes) - Number(mesInicio))
    const deudaTotalEnCuotas:number = (deudaAnual * 12) + deudaMensual

    if(deudaTotalEnCuotas > cliente.cuotas_pagadas.length) {
        if(Number(diaInicio) + 3 >= Number(dia)) return 1 
        return 0
    }
    return 2
}