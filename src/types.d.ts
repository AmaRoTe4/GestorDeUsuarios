//servicios 0 es ninguno 1 es prueba y 2 es base

interface Pago {
	mes:number,
	anio:number,
	fecha_de_pago: string;
}

export interface Cliente {
	id: string;
	clave: string;
	nombre_usuario: string;
	telefono:string;
	correo_electronico: string;
	servicio:number; //lo que le estamos dando al usuario
	estado:number; // si lo dejamos usar o no
	otros: object;
	inicio_de_actividad: string;
	cuotas_pagadas: Pago[]
	estado_vista?: number; // esto es lo que se usan en la app
}