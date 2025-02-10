import React from 'react'
import emptyCart from '../../../assets/images/details/emptyCart.svg';
import { Link } from 'react-router-dom';
import style from './emptyCart.module.css';
export default function EmptyCart() {
    return (
        <section className={`${style.emptyCart} d-flex flex-column justify-content-center align-items-center gap-3`}>
            <img src={emptyCart} />
            <div className={`${style.emptyCartText} text-center`}>
            <h1 className='fw-bold'>Your cart is currently empty.</h1>
            </div>
            <Link to={'/'}>Return to home</Link>
        </section>
    )
}
