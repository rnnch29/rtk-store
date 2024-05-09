import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../store/slices/cartSlice';
import Popup from './Popup';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import Card from './Card';

function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchCategories = async () => {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data = await res.json();
        setCategories(['All Products', ...data]);
    }

    const fetchProducts = async () => {
        setLoading(true);
        const res = await fetch('https://fakestoreapi.com/products/');
        const data = await res.json();
        setProducts(data);
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAdd = (product) => {
        dispatch(add({ ...product, qty: 1 }));
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1000);
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    }

    const filteredProducts = selectedCategory === 'All Products' ? products : products.filter(product => product.category === selectedCategory);

    return (
        <div className=''>
            {loading ? (
                <div className="absolute inset-0 flex justify-center items-center">
                    <ReactLoading type='spokes' color='gray'></ReactLoading>
                </div>

            ) : (
                <>
                    <div className="flex gap-3 flex-wrap ">
                        {categories.map((category, i) => (
                            <button
                                key={i}
                                className={`px-3 py-2 rounded border ${selectedCategory === category ? 'bg-pink-500 text-white' : 'bg-white '}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-5 my-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredProducts?.map((product, i) => (
                           <Card key={i} product={product} handleAdd={handleAdd} />
                        ))}
                    </div>

                    {showPopup && (
                        <Popup />
                    )}
                </>
            )
            }
        </div>
    );
}

export default Product;
