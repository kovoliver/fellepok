import {jwtDecode} from "jwt-decode";

export function storeToken(token, gc) {
    try {
        const sessionInfo = jwtDecode(token);
        localStorage.setItem("token", token);
        localStorage.setItem("sessionInfo", JSON.stringify(sessionInfo));

        if(gc) {
            gc.setToken(token);
            gc.setSessionInfo(sessionInfo);
        }
        return sessionInfo;
    } catch (e) {
        console.error("Invalid token received:", e);
        return null;
    }
}

export const fetchAPI = async (path, settings = {}, gc = null) => {
    try {
        const response = await fetch(path, settings);

        // 🔍 Token ellenőrzése a header-ben
        const authHeader = response.headers.get("Authorization");

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.replace("Bearer ", "");
            storeToken(token, gc);
        }

        // 📦 Response feldolgozása
        const json = await response.json();
        const obj = {...json};

        if (!response.ok) {
            throw {
                status: response.status,
                message: json?.message || "Hiba történt a kérés teljesítése közben!"
            };
        }

        obj.status = response.status;

        return obj;
    } catch (err) {
        if (err.status === 401) {
            console.warn("Unauthorized, token might be expired.");
            localStorage.removeItem("token");
            localStorage.removeItem("sessionInfo");
        }

        throw err;
    }
};

export const selectMenu = (path, menu) => {
    return path === menu ? "selected-menu" : "";
};

export const validateField = (name, value, fieldSchema) => {
    const schema = fieldSchema.extract(name);
    const { error } = schema.validate(value);
    return error?.details[0]?.message || null;
};

export const validateForm = (formData, schema) => {
    const { error } = schema.validate(formData, { abortEarly: false });
    const errors = {};
    const keys = Object.keys(formData);

    for (let key of keys) {
        errors[key] = null;
    }

    if (!error) {
        return { passed: true, errors };
    }

    for (let err of error.details) {
        errors[err.path] = err.message;
    }

    return {passed:false, errors};
};

export const handleChange = (e, setForm, setErrors = null, schema = null) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));

    if (setErrors && schema) {
        const error = validateField(name, value, schema);
        setErrors(prev => ({ ...prev, [name]: error }));
    }
};