import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import ReactStars from 'react-stars';


function Card( {product, handleAdd} ) {
    return (
        <div>
            <div className="p-5 rounded-xl bg-white">
                <div className="w-[120px] h-[220px] mx-auto flex content-center justify-center">
                    <img src={product?.image} alt={product?.title} className='object-cover my-auto' />
                </div>
                <div className="my-1">
                    <NavLink to={`/detail/${product.id}`}>
                        <p className='truncate font-bold hover:underline' >{product?.title}</p>
                    </NavLink>
                    <p className='text-sm text-gray-500'>{product?.category}</p>
                </div>
                <ReactStars
                  count={5}
                  value={product.rating.rate}
                  size={24}
                  edit={false}
                />
                <div className="my-1 flex flex-col gap-3  lg:flex-row lg:justify-between lg:items-center">
                    <p className='font-bold text-blue-500'>${product?.price}</p>
                    <button className='py-2  px-3 text-sm bg-pink-500 text-white rounded-md transition ease-in-out hover:bg-pink-600'
                        onClick={() => handleAdd(product)}
                    > <FontAwesomeIcon icon={faCartShopping} /> Add to cart </button>
                </div>
            </div>
        </div>
    )
}

export default Card