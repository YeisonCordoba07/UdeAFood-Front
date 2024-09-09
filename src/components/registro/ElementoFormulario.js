const ElementoFormulario = ({identificador, textoLabel, placeholderLabel, esRequerido = false, defaultValue, onChange}) =>{

    return(
    <label 
    htmlFor={identificador} 
    className="flex gap-5 items-center justify-between ">


        <span className="text-xl font-semibold">{textoLabel}</span>
        <input
            type="text"
            id={identificador} 
            name={identificador} 
            placeholder={placeholderLabel} 
            defaultValue={defaultValue}
            onChange={onChange}
            required={esRequerido}
            className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
        />


    </label>
    );
}

export {ElementoFormulario};