import { useContext } from "react";
import { GlobalContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { fetchAPI } from "../app/functions";
import { sBaseUrl } from "../app/url";

export default function Logout() {
    const gc = useContext(GlobalContext);
    const navigate = useNavigate();

    const logout = async ()=> {
        try {
            const response = await fetchAPI(`${sBaseUrl}/logout`, {
                method: "POST",
                headers: { 'authorization': `Bearer ${gc.token}` },
                credentials: "include"
            }, gc);

            if(response.logout) {
                localStorage.clear();
                navigate("/");
            }
        } catch (err) {
            gc.setMessages(err.message || "Hiba történt, próbálkozzon később!", "error");
        }
    };

    return(
        <li onClick={logout} className="bg-primary p-xs wp-100 cursor-pointer text-white">
            <Link>Logout</Link>
        </li>
    );
}