//export const fetchGet = async (path: string) => {  
//  return await fetch(import.meta.env.VITE_URL_SERVER_DATA + path, {
//    headers: {
//      clave: import.meta.env.VITE_PASSWORD_SERVER_USER,
//    },
//  })
//    .then((response) => response.json())
//    .catch((error) => console.error(error));
//};

//export const fetchPost = async (path:string , body:any) => {
//  const resultado = await fetch(
//    import.meta.env.VITE_URL_SERVER_DATA + path,
//    {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//      },
//      body
//    }
//  )
//    .then((response) => response.json())
//    .catch((error) => console.error(error));

//  if(resultado?.error){
//    console.log(resultado?.error);
//    return resultado;
//  }
//  return resultado;
//};
