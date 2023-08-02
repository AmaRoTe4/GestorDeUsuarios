import Swal from "sweetalert2";

export const cartelValidacion = (
  title: string,
  text: string = "",
  funcion: () => any
) =>
  Swal.fire({
    title: `${title}`,
    text: `${text}`,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Ok",
    preConfirm: () => {
      funcion();
    },
  });

export const cartelError = (title: string, text: string = "") =>
  Swal.fire({
    title: `${title}`,
    text: `${text}`,
    icon: "error",
    confirmButtonText: "Ok",
});

export const cartelSuccess = (title: string, text: string = "") =>
  Swal.fire({
    title: `${title}`,
    text: `${text}`,
    icon: "success",
    confirmButtonText: "Ok",
});
