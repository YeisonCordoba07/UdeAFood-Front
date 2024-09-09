import { Logo } from './Logo';
import {Navbar} from './Navbar';

const Header = () => {

    return(
        <header className='flex w-full items-center justify-between border-b  bg-green-600 p-[2em] font-sans font-bold uppercase text-text-primary backdrop-blur-[100px]  dark:bg-d-background dark:text-d-text-primary'>
            <Logo/>
            <Navbar/>
            
        </header>
                
    )
}

export { Header};

