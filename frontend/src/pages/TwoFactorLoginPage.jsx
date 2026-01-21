import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../App";
import { useContext } from "react";
import { fetchAPI } from "../app/functions";
import { useEffect } from "react";
import { sBaseUrl } from "../app/url";
import { useState } from "react";

export default function TwoFactorLoginPage() {
    const { userID, key } = useParams();
    const gc = useContext(GlobalContext);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const login = async () => {
        try {
            const response = await fetchAPI(`${sBaseUrl}/two-factor-login/${key}/${userID}`, {
                credentials:"include"
            }, gc);

            gc.setMessages(response.message, "success");

            setSuccess(true);
            let path = `/${response?.data?.role.toLowerCase()}/profile`;

            navigate(path);
        } catch (err) {
            gc.setMessages(err.message || "Hiba történt, kérjük próbálkozz később!", "error");
        }
    };

    useEffect(() => {
        login();
    }, []);

    return (
        <div className="text-center">
           
        </div>
    );
};