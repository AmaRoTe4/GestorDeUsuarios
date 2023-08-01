import { Cliente } from "../types";
import { fechaActual, separarStringPorSlash } from "./fechaActual";

// 0 -> debe y paso el plazo
// 1 -> debe pero esta en los tres dias
// 2 -> pagado
// 10 -> prueba
export const estadoOfCliente = (cliente:Cliente):number => {
    //el id_servicio === 1 es prueba
    if(cliente.servicios[0].id_servicio === 1) return 10
    const [dia , mes , anio] = separarStringPorSlash(fechaActual().fecha);
    const [diaInicio , mesInicio , anioInicio] = separarStringPorSlash(cliente.servicios[0].inicio_de_actividad)
    
    const deudaAnual:number = (Number(anio) - Number(anioInicio))
    const deudaMensual:number = (Number(mes) - Number(mesInicio))
    const deudaTotalEnCuotas:number = (deudaAnual * 12) + deudaMensual

    if(deudaTotalEnCuotas > cliente.servicios[0].coutas_pagadas.length) {
        if(Number(diaInicio) + 3 >= Number(dia)) return 1 
        return 0
    }
    return 2
}