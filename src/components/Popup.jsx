import React from 'react'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Popup() {
    return (
        <div>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="bg-black bg-opacity-70 p-4 rounded-md shadow-xl">
                    <FontAwesomeIcon icon={faCheckCircle} size='3x' className='text-green-500 block mx-auto mb-3 ' />
                    <p className="text-lg font-bold text-white">Product added to cart!</p>
                </div>
            </div>
        </div>
    )
}

export default Popup