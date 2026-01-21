import { useState } from "react";
import { sBaseUrl } from "../app/url";
import { regSchema } from "../app/schemas";
import { handleChange, validateForm } from "../app/functions";
import { useContext } from "react";
import { GlobalContext } from "../App";
import { fetchAPI } from "../app/functions";

function RegisterPage() {
    const gc = useContext(GlobalContext);

    const [formData, setFormData] = useState({
        email: "",
        pass: "",
        passAgain: "",
        role:""
    });

    const [errors, setErrors] = useState({
        email: "",
        pass: "",
        passAgain: "",
        role:""
    });

    const register = async () => {
        try {
            const errs = validateForm(formData, regSchema);

            if (!errs.passed) {
                setErrors(errs.errors);
                return;
            }

            const response = await fetchAPI(`${sBaseUrl}/register`, {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData)
            });

            gc.setMessages(response.message, "success");

            setFormData({
                email: "",
                pass: "",
                passAgain: "",
                role:"kiscica"
            });
        } catch(err) {
            gc.setMessages(err.message||"Hiba történt, próbálkozzon később!", "error");
        }
    };

    return (
        <div className="my-10">
            <div className="maxw-400 box-light margin-auto p-md">
                <h2>Regisztráció</h2>

                <h3>Regisztráció típusa</h3>
                <b className="color-error">{errors.role ? errors.role : ""}</b>

                <select onChange={e=>handleChange(e, setFormData, setErrors, regSchema)}
                name="role" className="input-sm input-primary wp-100">
                    <option value="-">-</option>
                    <option value="ARTIST">Fellépő</option>
                    <option value="CUSTOMER">Megrendelő</option>
                </select>

                <h3>Email cím</h3>
                <b className="color-error">{errors.email ? errors.email : ""}</b>

                <input
                    onChange={e => handleChange(e, setFormData, setErrors, regSchema)}
                    name="email"
                    type="text" value={formData.email}
                    className="input-sm input-primary wp-100"
                />

                <h3>Jelszó</h3>
                <b className="color-error">{errors.pass ? errors.pass : ""}</b>
                <input
                    onChange={e => handleChange(e, setFormData, setErrors, regSchema)}
                    name="pass"
                    type="password" value={formData.pass}
                    className="input-sm input-primary wp-100"
                />

                <h3>Jelszó újra</h3>
                <b className="color-error">
                    {formData.pass !== formData.passAgain && formData.passAgain !== ""
                        ? "A két jelszó nem egyezik!" : ""}
                </b>

                <input
                    onChange={e => handleChange(e, setFormData)}
                    name="passAgain"
                    type="password" value={formData.passAgain}
                    className="input-sm input-primary wp-100"
                />

                <button className="input-sm btn-primary d-block margin-auto mt-md" onClick={register}>
                    Regisztráció
                </button>
            </div>
        </div>
    )
}

export default RegisterPage;