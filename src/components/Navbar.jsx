import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import logo from '../assets/icon/redux.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCheckCircle, faHouse } from '@fortawesome/free-solid-svg-icons';

function Navbar() {

  const cartItems = useSelector((state) => state.cart.cartItems)
  const [scroll, setScroll] = useState(false)

  const handleScroll = () => {
    if (window.scrollY >= 10) {
      setScroll(true)
    } else {
      setScroll(false)
    }

    
  }

  window.addEventListener('scroll', handleScroll)

  return (
    <nav className={`sticky top-0 transition ease-in-out duration-300 z-10 ${scroll ? 'bg-white shadow': ''}`}>
      <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
        <NavLink to='/'>
          <div className="flex items-center gap-x-2">
            <img src={logo} className='w-[40px]' />
            <h1 className='text-xl font-bold'>STORE</h1>
          </div>
        </NavLink>
        <div className="flex grap-5">
          <NavLink to='/'><FontAwesomeIcon icon={faHouse} className='text-xl hover:text-gray-500' /></NavLink>

          <NavLink to='/cart'><div className="relative ml-5">
            <FontAwesomeIcon icon={faCartShopping} className='text-xl hover:text-gray-500' />
            <span className='bg-pink-500 text-white px-2 text-sm rounded-full absolute top-[-15px] right-[-10px]'>{cartItems.length}</span>
          </div>
          </NavLink>

        </div>
      </div>

    </nav>
  )
}

export default Navbar