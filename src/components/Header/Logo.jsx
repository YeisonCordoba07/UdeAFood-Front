import React from 'react'
import Link from "next/link";
const Logo = () => {
  return (
    <div>
      <Link href="/">
        <img
          src='LogoUdeAFood.png'
          className='flex justify-items-start mx-auto w-35 h-20'
          alt='logo'
        />
      </Link>
    </div>
  )
}

export { Logo };