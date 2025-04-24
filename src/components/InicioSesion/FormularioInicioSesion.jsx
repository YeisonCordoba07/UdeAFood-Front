import {ElementoFormulario} from '../registro/ElementoFormulario';
import {useAuth} from '@/context/AuthContext';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import Link from "next/link";

const FormularioInicioSesion = () => {

  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState('usuario');
  const {login} = useAuth(); // Usamos el método login del contexto de autenticación
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(correo, clave, tipoUsuario); // Intentamos iniciar sesión
      router.push('/'); // Redirige a la página principal o a donde quieras después del inicio de sesión
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error(err);
    }
  };

  return (
    <form className="flex gap-3 flex-col w-[650px] py-11" onSubmit={handleLogin}>
      {error && <p className="text-red-500">{error}</p>} {/* Muestra el error si existe */}
      <ElementoFormulario
        identificador={"correo"}
        textoLabel={"Correo *"}
        placeholderLabel={"example@gmail.com"}
        esRequerido={true}
        type="email" // Asegúrate de que el tipo de entrada sea correcto
        onChange={(e) => setCorreo(e.target.value)} // Maneja el cambio del correo
      />

      <ElementoFormulario
        identificador={"clave"}
        textoLabel={"Contraseña *"}
        placeholderLabel={"Clave"}
        esRequerido={true}
        type="password" // Cambia el tipo a 'password'
        onChange={(e) => setClave(e.target.value)}
      />

      <div className="flex gap-4 items-center">
        <label htmlFor="tipoUsuario">Tipo de usuario:</label>
        <select
          id="tipoUsuario"
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="usuario">Usuario</option>
          <option value="tienda">Tienda</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white font-bold text-xl py-2 rounded-lg hover:bg-green-700 hover:scale-105 duration-300">
        Iniciar Sesión
      </button>

      <div className={"flex flex-col gap-2"}>

        <Link href={"/registro"} className={"w-fit"}>
          <span className="text-blue-600 underline">Registrarse</span>
        </Link>

      </div>
    </form>
  )
}

export {FormularioInicioSesion};