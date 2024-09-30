import Image from "next/image";
import Link from "next/link";

const HeaderRegistro = () => {
    return (
        <header className="bg-green-600 h-16 flex items-center px-8">
            <Link href="/">
                <Image src="/LogoUdeAFood.png" alt="Logo" width={100} height={100} />
            </Link>
        </header >
    );
}

export { HeaderRegistro };