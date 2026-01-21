import { useContext, useState } from "react";
import { fetchAPI } from "../app/functions";
import { sBaseUrl } from "../app/url";
import { GlobalContext } from "../App";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const gc = useContext(GlobalContext);

    const login = async () => {
        try {
            const response = await fetchAPI(`${sBaseUrl}/login`, {
                method:"POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email, pass })
            });

            gc.setMessages(response.message, "success");
        } catch (err) {
            console.log(err);
            gc.setMessages(err.message || "Hiba történt, kérjük próbálkozz később!", "error");
        }
    };

    return (
        <div className="maxw-300 box-light margin-auto p-md">
            <h2>Bejelentkezés</h2>

            <h3>Email cím</h3>
            <input
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="text" value={email}
                className="input-sm input-primary wp-100"
            />

            <h3>Jelszó</h3>
            <input
                onChange={e => setPass(e.target.value)}
                name="pass"
                type="password" value={pass}
                className="input-sm input-primary wp-100"
            />

            <button className="input-sm btn-primary d-block margin-auto mt-md" onClick={login}>
                Bejelentkezés
            </button>
        </div>
    );
}