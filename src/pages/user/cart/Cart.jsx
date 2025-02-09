import React, { useEffect, useState } from 'react'
import Loading from '../../../components/user/loading/Loading';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import style from './cart.module.css';


export default function Cart() {

    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getCart = async () => {
        const token = localStorage.getItem('userToken');
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

    useEffect(() => {
        getCart();
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <section className={style.cart}>
            <Container>
                <table className='w-100' cellPadding={30}  >
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
                                    <span className='fw-bold'>{item.details.name}</span>
                                </td>
                                <td>{item.details.finalPrice}$</td>
                                <td >
                                    <div className='d-flex justify-content-center'>
                                        <div className={`${style.quantity} d-flex align-items-center gap-3`}>
                                        <button >-</button>
                                        <span >{item.quantity}</span>
                                        <button >+</button>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.quantity * item.details.finalPrice}$</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Container>
        </section>
    )
}
