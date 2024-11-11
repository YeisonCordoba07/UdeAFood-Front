const ElementoFormulario = ({ identificador, textoLabel, placeholderLabel, esRequerido = false, defaultValue, onChange, type = "text", options }) => {
    return (
        <label htmlFor={identificador} className="flex gap-5 items-center justify-between">
            <span className="text-xl font-semibold">{textoLabel}</span>

            {type === "select" && options ? (
                <select
                    id={identificador}
                    name={identificador}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    required={esRequerido}
                    className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack w-96"
                >
                    <option disabled value="">
                        {placeholderLabel}
                    </option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    id={identificador}
                    name={identificador}
                    placeholder={placeholderLabel}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    required={esRequerido}
                    className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                />
            )}
        </label>
    );
};

export { ElementoFormulario };