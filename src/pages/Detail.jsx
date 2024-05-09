import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { add } from '../store/slices/cartSlice';
import Popup from '../components/Popup';
import ReactLoading from 'react-loading';
import ReactStars from 'react-stars';

function Detail() {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[])

  const [loading, setLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false);
  const { id } = useParams()
  const [product, setProduct] = useState([])
  const dispatch = useDispatch()

  const fetchProduct = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await res.json()
    setProduct(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const handleAdd = (product) => {
    dispatch(add({ ...product, qty: 1 }));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1000);
  }

  !loading ? document.title = product.title : null



  return (

    <div className='min-h-screen max-w-7xl mx-auto p-5 mb-10'>
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <ReactLoading type='spokes' color='gray'></ReactLoading>
        </div>
      ) : (
        <>

          <div className="mb-2 flex gap-2 text-sm">
            <NavLink to='/' ><span className='mb-5 text-pink-500'>Home</span></NavLink>
            <span>&gt;</span>
            <span className='mb-5 text-gray-500 truncate'>{product.title}</span>
          </div>

          <div className="grid grid-rows lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center bg-white rounded-md p-5">
              <img src={product.image} alt={product.title} className='w-[200px] lg:w-[300px]' />
            </div>
            <div className="flex flex-col">
              <h1 className='text-2xl font-bold'>{product.title}</h1>
              <p className='text-2xl text-gray-500'>{product.category}</p>
              <p className='text-2xl text-blue-500 font-bold my-3'>${product.price}</p>

              <div className="flex gap-3 items-center">
                <p className='text-xl text-pink-500 underline'>{product.rating.rate}</p>
                <ReactStars
                  count={5}
                  value={product.rating.rate}
                  size={24}
                  edit={false}
                />
              </div>
              <p className='text-md md:text-xl text-gray-400 my-3'>{product.description}</p>

              <div className='my-3'>
                <button className='w-full md:w-auto py-2 px-3 text-md bg-pink-500 text-white rounded-md transition ease-in-out hover:bg-pink-600'
                  onClick={() => handleAdd(product)}
                > <FontAwesomeIcon icon={faCartShopping} /> Add to cart</button>
              </div>
            </div>

          </div>
        </>)}



      {showPopup && (
        <Popup />
      )}

    </div>
  )
}

export default Detail