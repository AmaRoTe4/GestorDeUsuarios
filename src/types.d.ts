//servicios 0 es ninguno 1 es prueba y 2 es base

interface Pago {
  mes: number;
  anio: number;
  fecha_de_pago: string;
}
interface DatosCliente {
	nombre:string
	telefono:string
	correo:string
	id_localidad:number
	direccion:string
	nobre_del_local:string
	clave:string
	salt:string
}

interface Servicio {
	id_servicio: number
	inicio_de_actividad: string
	coutas_pagadas: Pago[]
	valor_de_cuotas: number
	id_server: number
}

export interface Cliente {
  id?: string;
  _id?: string;
  cliente: DatosCliente;
  servicios: Servicio[]
  otros: object
  estado: boolean
  id_vendedor: number
  estado_vista?:number
}