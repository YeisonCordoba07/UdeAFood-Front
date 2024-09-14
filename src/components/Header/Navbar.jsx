import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Navbar = () => {
  return (

    <nav className='flex flex-[1] justify-between w-full'>
                <div className="flex bg-gray-200 rounded-full  w-full max-w-xl mx-auto py-0">
                    <div className="pointer-events-none flex items-center justify-center px-2">
                        <SearchIcon className="text-gray-500" />
                    </div>

                    {/* Search Input */}
                    <InputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    className="pr-2 bg-transparent text-gray-700 focus:outline-none pl-2"/>
                </div>

            <button 
            type = "submit"
            className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-600 hover:scale-95 duration-300">
                Registrarse</button>
            
            <button 
            type = "submit"
            className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-600 hover:scale-95 duration-300">
                Iniciar sesión </button>
                
            </nav>
    
  )
}

export {Navbar};