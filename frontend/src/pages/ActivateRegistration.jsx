import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../App";
import { useContext } from "react";
import { fetchAPI } from "../app/functions";
import { useEffect } from "react";
import { sBaseUrl } from "../app/url";
import { useState } from "react";

export default function ActivateRegistration() {
    const { userID, activationString } = useParams();
    const gc = useContext(GlobalContext);
    const [success, setSuccess] = useState(false);
    const [countDown, setCountDown] = useState(5);
    const navigate = useNavigate();

    async function activateRegistration() {
        try {
            const response = await fetchAPI(`${sBaseUrl}/activate-user/${userID}/${activationString}`);

            gc.setMessages(response.message, "success");

            setSuccess(true);
        } catch (err) {
            gc.setMessages(err.message || "Hiba történt, kérjük próbálkozz később!", "error");
        }
    }

    useEffect(() => {
        activateRegistration();
    }, []);

    useEffect(() => {
        if (!success) return;

        const intervalID = setInterval(() => {
            setCountDown(c => --c);
        }, 1000);

        return () => clearInterval(intervalID);
    }, [success]);

    useEffect(() => {
        if (countDown === 0) {
            navigate("/login");
        }
    }, [countDown]);

    return (
        <div className="text-center">
            {
                success &&
                <h4>A regisztráció megerősítése sikeres volt. Átirányítunk {countDown} mp múlva.</h4>
            }
        </div>
    );
}