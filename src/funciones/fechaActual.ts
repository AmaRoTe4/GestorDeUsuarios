export const fechaActual = () => {
  const fechaActual = new Date();

  const dia: number = fechaActual.getDate();
  const mes: number = fechaActual.getMonth() + 1;
  const año: number = fechaActual.getFullYear();
  const horas: number = fechaActual.getHours();
  const minutos: number = fechaActual.getMinutes();

  return {
    fecha:
      dia.toString().padStart(2, "0") + // eslint-disable-line @typescript-eslint/restrict-plus-operands
      "/" +
      mes.toString().padStart(2, "0") +
      "/" +
      año,
    hora:
      horas.toString().padStart(2, "0") +
      ":" +
      minutos.toString().padStart(2, "0"),
  };
};

export function adaptarFecha(texto: string) {
  return texto.replace(/\//g, "-");
}

export function separarStringPorSlash(str:string):string[] {
  return str.split("/");
}