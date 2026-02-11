import { useEffect, useState } from "react";
import { handleChange } from "../app/functions";

export default function CheckInputComp({ data, setData, schema, name, title }) {
    const [errors, setErrors] = useState({name});

    console.log(data[name]);

    return (
        <>
            <div className="font-weight-600 mb-xs">
                {title}
            </div>
            <b className="color-error">{errors[name] ? errors[name] : ""}</b>

            <input
                className="input-xs input-primary wp-80"
                onChange={e => handleChange(e, setData, setErrors, schema)}
                value={data[name]} type="text" name={name}
            />
        </>
    );
}