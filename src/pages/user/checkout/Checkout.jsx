import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import style from './checkout.module.css';
import Loading from '../../../components/user/loading/Loading';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../components/user/context/CartContext';


export default function Checkout() {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();
    const {setCartCount} = useContext(CartContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
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

    const placeOrder = async (value) => {

        setLoader(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BURL}/order`, value,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );
            if (response.status === 201) {
                toast.success('Order placed successfuly', {
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
                navigate('/profile/orders');
                setCartCount(0);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    useEffect(() => {
        getCart();
    }, [])

    if (isLoading) {
        return <Loading />
    }
    return (
        <section className={style.order}>
            <Container>
                <Form onSubmit={handleSubmit(placeOrder)}>
                    <Row className='g-4'>
                        <Col lg={6} md={12}>
                            <h1 className='fs-5 fw-bold'>Billing details</h1>
                            <Form.Group className='mb-3' controlId="exampleForm.ControlInput1">
                                <Form.Label>Address *</Form.Label>
                                <Form.Control type="text"  {...register('address', { required: "Please enter your address" })} />
                                {errors.address ? <div className='text-danger error'>{errors.address.message}</div> : null}
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="exampleForm.ControlInput1">
                                <Form.Label>Phone *</Form.Label>
                                <Form.Control type="tel" {...register('phone', { required: "Please enter your phone" })} />
                                {errors.phone ? <div className='text-danger error'>{errors.phone.message}</div> : null}
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Coupon (optional)</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                        </Col>
                        <Col lg={6} md={12}>
                            <div className={`${style.orderDetails} d-flex flex-column gap-3`}>
                                <h2 className='fw-bold fs-6'>Your order</h2>
                                <div className={`${style.orderItem} d-flex justify-content-between pb-3`}>
                                    <span>Products</span>
                                    <span>Subtotal</span>
                                </div>
                                <div className={`${style.orderItem} `}>
                                    {cart.map(item =>
                                        <div key={item._id} className='d-flex justify-content-between pb-3'>
                                            <span className={style.productName}>{item.details.name} <span className={`${style.productName} fw-bold`}>x{item.quantity}</span></span>
                                            <span className={style.price}>&nbsp;${item.quantity * item.details.finalPrice}</span>
                                        </div>
                                    )}
                                </div>
                                <div className={`${style.orderItem} d-flex justify-content-between pb-3`}>
                                    <span>Total</span>
                                    <span className={style.price}>${
                                        cart.reduce((sum, item) => sum + (item.details.finalPrice * item.quantity), 0)}</span>
                                </div>
                                <p>Your personal data will be used to process your order,
                                    support your experience throughout this website, and for
                                    other purposes described in our <span className={style.privacy}>privacy policy</span>.</p>
                                <button type='submit' className={style.button} disabled={loader}>Place order</button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </section>
    )
}
