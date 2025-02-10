import React, { useEffect, useState } from 'react'
import Loading from '../../../components/user/loading/Loading';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import style from './cart.module.css';


export default function Cart() {

    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('userToken');
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
        try{
            const response = await axios.patch(`${import.meta.env.VITE_BURL}/cart/incraseQuantity`,
                {
                    productId:productId
                },
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            )
           setCart(prevCart =>{
                return prevCart.map(item =>{
                     if(item.productId === productId){
                          return {...item, quantity:item.quantity + 1}
                     }
                     return item;
                })
           })
    }catch(error){
        console.log(error);
    }
}

const decreaseQuantity = async (productId) => {
    try{
        const response = await axios.patch(`${import.meta.env.VITE_BURL}/cart/decraseQuantity`,
            {
                productId:productId
            },
            {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            }
        )
       setCart(prevCart =>{
            return prevCart.map(item =>{
                 if(item.productId === productId){
                      return {...item, quantity:item.quantity - 1}
                 }
                 return item;
            })
       })
}catch(error){
    console.log(error);
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
                <table className='w-100' >
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
                                    <div className='d-flex justify-content-center '>
                                        <div className={`${style.quantity} d-flex align-items-center gap-3 `}>
                                        <button onClick={()=>decreaseQuantity(item.productId)} >-</button>
                                        <span >{item.quantity}</span>
                                        <button onClick={()=>increaseQuantity(item.productId)}>+</button>
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
