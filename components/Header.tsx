import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Header: React.FC = () => {
  const [show, setShow] = useState<boolean>(false)

  const transitionHeader = () => {
    if (window.scrollY > 100) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', transitionHeader)
    return () => window.removeEventListener('scroll', transitionHeader)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-transparent ${
        show && 'bg-black'
      } p-10 transition-all duration-500 ease-in`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <img
            className="fixed left-5 w-28 cursor-pointer"
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
        </Link>

        {/* Avatar */}
        <Link href="/profile">
          <img
            className="fixed right-5 w-9 cursor-pointer"
            src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
            alt=""
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
