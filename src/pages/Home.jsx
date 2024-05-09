import React, { useEffect } from 'react'
import Product from '../components/Product'

function Home() {

  document.title = 'RTK Store - Home'
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='max-w-7xl mx-auto p-5  min-h-screen'>
      <Product />
    </div>

  )
}

export default Home