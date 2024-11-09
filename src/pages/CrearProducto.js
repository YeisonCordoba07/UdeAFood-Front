import { FormularioCrearProducto } from "@/components/FormularioCrearProducto/FormularioCrearProducto";
import { Header } from "@/components/Header/Header";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import InicioSesion from "./inicioSesion";

const CrearProducto = () => {

    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
        if (!user) { // Cambia isAuthenticated por user
            router.push(InicioSesion); // Ajusta la ruta según la ubicación de tu página de inicio de sesión
        }
    }, [user, router]);

    return (
        <div className="flex flex-col items-center gap-10">

            <Header/>
            <FormularioCrearProducto />

        </div>
    );
}

export default CrearProducto;