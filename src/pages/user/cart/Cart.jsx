import React, { useEffect, useState } from 'react'
import Loading from '../../../components/user/loading/Loading';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import style from './cart.module.css';
import { CartContext } from '../../../components/user/context/CartContext';
import { useContext } from 'react';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import { set } from 'react-hook-form';


export default function Cart() {

    const { cartCount, setCartCount } = useContext(CartContext);
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const[clear,setClear]=useState(false);
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();

    const getCart = async () => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_BURL}/cart`,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );
            setCart(response.data.products);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    const increaseQuantity = async (productId) => {
        setLoading(true);
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BURL}/cart/incraseQuantity`,
                {
                    productId: productId
                },
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            )
            setCart(prevCart => {
                return prevCart.map(item => {
                    if (item.productId === productId) {
                        return {...item, quantity: item.quantity + 1 }
                    }
                    return item;
                })
            })
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const decreaseQuantity = async (productId) => {
        setLoading(true);
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BURL}/cart/decraseQuantity`,
                {
                    productId: productId
                },
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            )
            setCart(prevCart => {
                return prevCart.map(item => {
                    if (item.productId === productId) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    return item;
                })
            })
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const removeItem = async (productId) => {
    setLoading(true);
      try {
            const response = await axios.patch(`${import.meta.env.VITE_BURL}/cart/removeItem`,
                {
                    productId: productId
                },
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            )
            setCart(prevCart => {
                return prevCart.filter(item => item.productId !== productId)
            })
            setCartCount(prev => prev - 1);
        } catch (error) {
            console.log(error);
    }finally{
        setLoading(false);
    }
    }

    const clearCart = async () => {
        setLoading(true);
        setClear(true);
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BURL}/cart/clear`, 
                null,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            )
            if (response.status === 200) {
                toast.success('cart clear successfuly', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                navigate('/');
                setCartCount(0);
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
            setClear(false);
        }
    }

    useEffect(() => {
        getCart();
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
        {cartCount?
        <section className={style.cart}>
            <Container>
                <table className='w-100'>
                    <thead>
                        <tr>
                            <th className='w-25'>Product</th>
                            <th className='text-center w-25'>Price</th>
                            <th className='text-center w-25'>Quantity</th>
                            <th className='text-center w-25'>Total</th>
                        </tr>
                    </thead>

                    <tbody className='text-center'>
                        {cart.map(item =>
                            <tr key={item._id}  >
                                <td className='d-flex align-items-center gap-3' >
                                    <img src={item.details.mainImage.secure_url} width={50} />
                                    <span className={`${style.productName} fw-bold`}>{item.details.name}</span>
                                </td>
                                <td>{item.details.finalPrice}$</td>
                                <td >
                                    <div className='d-flex justify-content-center'>
                                        <div className={`${style.quantity} d-flex align-items-center gap-3 `}>
                                            <button onClick={() => decreaseQuantity(item.productId)} disabled={loading}>-</button>
                                            <span >{item.quantity}</span>
                                            <button onClick={() => increaseQuantity(item.productId)} disabled={loading}>+</button>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.quantity * item.details.finalPrice}$</td>
                                <td><button className={style.removeItem} onClick={() => removeItem(item.productId)} disabled={loading}>
                                    <i className="fa-solid fa-minus" style={{ color: '#ffffff' }} ></i>
                                </button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {cartCount ? <button className={`${style.clearBtn} `} onClick={() => clearCart()} disabled={(clear||loading)}>{clear?"Clear Cart...":"Clear Cart"}</button> : ""}
            </Container>
        </section>:<EmptyCart />}
                        </>
    )
}
