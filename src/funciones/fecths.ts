import { URL_SERVER_USER, CLAVE_SERVER_USER_GET} from "../validaciones/env";

export const fetchGet = async (path: string) => {
  return await fetch(URL_SERVER_USER + path, {
    headers: {
      clave: CLAVE_SERVER_USER_GET,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const fetchPost = async (path: string, body: any) => {
  const resultado = await fetch(URL_SERVER_USER + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));

  if (resultado?.error) {
    console.log(resultado?.error);
    return resultado;
  }
  return resultado;
};
