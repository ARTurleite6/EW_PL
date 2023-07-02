import { useState } from "react";

const InputText = ({ onChange, value, message, placeholder, required, type }:
    { onChange: (value: string) => void, value: string, message: string, placeholder: string, required?: boolean, type?: string }) => {

    const [valueState, setValueState] = useState(value);

    const handleChange = (event: { target: { value: string; }; }) => {
        setValueState(event.target.value);
        onChange(event.target.value);
    }

    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="dimensions">
                {message} <span className="text-red-500">{required ? "*" : ""}</span>
            </label>
            <input
                id={message}
                name={message}
                type={type ? type : "text"}
                value={valueState}
                placeholder={placeholder}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
            />
        </div>
    );

}

export default InputText;
