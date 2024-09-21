import Image from "next/image";


const HeaderRegistro = () =>{
    return(
        <header  className="bg-green-600 h-16 flex items-center px-8">
            <Image src="/LogoUdeAFood.png" alt="Logo" width={100} height={100}/>


        </header>
    );
}

export {HeaderRegistro};