import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add, remove, decrease } from '../store/slices/cartSlice'
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import empty from '../assets/icon/empty-cart.png'

function Cart() {

  document.title = 'RTK Store - Shopping Cart'
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const products = useSelector((state) => state.cart.cartItems)
  const totalPrice = useSelector((state) => state.cart.total)
  const dispatch = useDispatch()

  const handleRemove = (productID) => {
    dispatch(remove(productID))
  }

  const handleIncreae = (productID) => {
    dispatch(add({ ...productID, qty: 1 }))
  }

  const handleDecreae = (productID) => {
    dispatch(decrease({ ...productID, qty: 1 }))
  }

  return (
    <div className='max-w-7xl mx-auto p-5 min-h-screen mb-10'>

      <div className="mb-2 flex gap-2 text-sm">
        <NavLink to='/' ><span className='mb-5 text-pink-500'>Home</span></NavLink>
        <span>&gt;</span>
        <span className='mb-5 text-gray-500'>Shopping Cart</span>
      </div>


      {products.length < 1 ? (
        <div className="text-center mt-10 text-gray-500">
          <img src={empty} alt="" className='mx-auto w-[100px] mb-5' />
          <p className='text-xl font-bold'>Your cart is empty.</p>
          <p>You have no products in your cart. Please select and add the products you want to purchase to your shopping cart.</p>
          <NavLink to='/'><p className='text-xl text-blue-500 mt-10 font-bold'>Go to shopping</p></NavLink>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <h1 className='text-xl font-bold my-5'>Shopping Cart ({products.length})</h1>

          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">

            <tbody className='bg-white'>
              {products?.map((product, i) => (

                <tr key={i} className="border-b border-gray-200">

                  <td className="p-5 flex flex-col gap-5 items-center justify-between lg:flex-row">
                    <img src={product?.image} alt="" className="w-[65px] h-[55px]" />
                    <p className="text-black font-bold">{product?.title}</p>
                    <p className="text-gray-500 font-bold">${product?.price}</p>

                  </td>

                  <td className="px-6 py-4">
                    <div className="flex-row justify-center text-center md:flex md:justify-between">
                      <div className='flex'>
                        <button className={`text-white bg-blue-500 px-3 text-xl font-bold rounded ${product?.qty <= 1 ? 'opacity-60' : ''
                          }`}
                          onClick={() => handleDecreae(product)}
                          disabled={product?.qty <= 1 ? true : false}
                        >-</button>
                        <input type="text" value={product?.qty} className='w-[40px] text-center' readOnly={true} />
                        <button className='text-white bg-blue-500 px-3 text-xl font-bold rounded '
                          onClick={() => handleIncreae(product)}
                        >+</button>
                      </div>
                      <div className='mt-5 md:mt-0'>
                        <button className="text-gray-300 text-xl hover:text-gray-400"
                          onClick={() => handleRemove(product.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} className="px-2" />
                        </button>
                      </div>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between text-xl font-bold bg-white my-5 p-5 rounded-xl">
            <p>Total price:</p>
            <p className='text-blue-500'>${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex flex-col-reverse gap-3 items-center lg:flex-row lg:gap-3 lg:justify-between">
            <NavLink to='/'>
              <button className='px-2 py-2 text-gray-500 hover:underline '>Go to Shopping</button>
            </NavLink>
            <button className='w-full text-white px-2 py-2 bg-pink-500 rounded lg:w-auto'>CHECKOUT</button>
          </div>
        </div>
      )}



    </div>
  )
}

export default Cart