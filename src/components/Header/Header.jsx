import { Logo } from './Logo';
import {Navbar} from './Navbar';

const Header = () => {

    return(
        <header className='flex w-full items-center justify-between border-b py-1 bg-green-600 p-[2em] '>
            <Logo/>
            <Navbar/>
            
        </header>
                
    )
}

export { Header};

