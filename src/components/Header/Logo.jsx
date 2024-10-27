import React from 'react'
import Link from "next/link";
const Logo = () => {
  return (

      <Link href="/" className="flex justify-start w-28 h-14 mr-10 min-w-10">
        <img
          src='LogoUdeAFood.png'
          className='object-contain w-full h-full'
          alt='logo'
        />
      </Link>

  )
}

export { Logo };