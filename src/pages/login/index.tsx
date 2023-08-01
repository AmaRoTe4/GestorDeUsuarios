import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarLogin } from "../../validaciones/login";

export default function Login() {
    const navigate = useNavigate();

    const iniciarSesion = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const id = formData.get("id") as string

        const resultado = validarLogin(id)
        if (!(resultado)) return;
        localStorage.setItem("user", JSON.stringify({ id: id }))
        setTimeout(() => navigate("/"), 1000);
        setTimeout(() => window.location.reload(), 1500);
    }

    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20 }}>
            <h1 className="text-[30px]">Login</h1>
            <form
                onSubmit={e => iniciarSesion(e)}
                style={{ padding: "50px 100px", border: "solid 1px black", display: "flex", flexDirection: "column", borderRadius: 5, gap: 20 }}
            >
                <div style={{ display: "flex", flexDirection: "column", borderRadius: 5, gap: 10, width: "100%" }}>
                    <input style={{ border: "1px solid black", padding: 10, borderRadius: 5 }} type="text" placeholder="clave" id="id" name="id" />
                </div>
                <button style={{ border: "none", padding: 10, background: "rgb(100 100 255)", borderRadius: 5 }} type="submit">Ingresar</button>
            </form>
        </div>
    )
}