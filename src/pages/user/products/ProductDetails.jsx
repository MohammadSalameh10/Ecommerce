import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../components/user/loading/Loading';
import useFetch from '../../../hooks/useFetch';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import cart from '../../../assets/images/details/cart.svg';
import payment from '../../../assets/images/details/payment.svg';
import warranty from '../../../assets/images/details/warranty.svg';
import wishlist from '../../../assets/images/details/wishlist.svg';
import share from '../../../assets/images/details/share.svg';
import compare from '../../../assets/images/details/compare.svg';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import style from './productsDetails.module.css';
import Rating from '../../../components/user/rating/Rating';
import RelatedProducts from '../../../components/user/products/RelatedProducts';
import { Slide, toast } from 'react-toastify';
import { CartContext } from '../../../components/user/context/CartContext';
import { useForm } from 'react-hook-form';

export default function ProductDetails() {
    const { productId } = useParams();
    const { data, error, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products/${productId}`);
    const navigate = useNavigate();
    const { cartCount, setCartCount } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [buyLoading, setBuyLoading] = useState(false);
    const token = localStorage.getItem('userToken');
    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const{register,handleSubmit,formState: { errors }}= useForm();


    const addProductToCart = async () => {
       
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BURL}/cart`,
                {
                    productId: productId,
                },
                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    },
                }
            )
            if (response.status === 201) {
                toast.success('product add successfuly', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                navigate('/cart');
                setCartCount(cartCount + 1);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 409) {
                toast.error('Product already add to cart', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
            }
        } finally {
            setLoading(false);
        }
    }

    const buyProduct = async () => {
        setBuyLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BURL}/cart`,
                {
                    productId: productId,
                },
                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    },
                }
            )
            if (response.status === 201) {
                navigate('/checkout');
                setCartCount(cartCount + 1);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 409) {
                toast.error('Product already add to cart', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
            }
        } finally {
            setBuyLoading(false);
    }
}

  const addReview = async (value) => {
    setLoader(true);
    try{
        const response = await axios.post(`${import.meta.env.VITE_BURL}/products/${productId}/review`, value,
            {
                headers: {
                    Authorization: `Tariq__${token}`,
                }
            }
        );
       if(response.status === 201){
        toast.success('Review add successfuly', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
       }
    }catch(errors){
         toast.error('You must delivered product befor rewiew', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Slide,
                });
    }finally{
        setLoader(false);
        setShow(false)
    }
    
  }

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            {error ? <div className='alert alert-danger m-0'>{error}</div> :
                <section className={style.products}>
                    <Container>
                        <div className={`${style.product} d-flex gap-5`}>
                            <div className='product-image d-flex flex-column'>
                                <div className='d-flex justify-content-center position-relative'>
                                    <img src={data.product.mainImage.secure_url} />
                                    <span className={style.discount}>{data.product.discount}%</span>
                                </div>
                                <div className={`${style.productImages} d-flex justify-content-center`} >
                                    {data.product.subImages.map((image, index) => (
                                        <img key={index} src={image.secure_url} />
                                    ))}
                                </div>
                            </div>
                            <div className={`${style.productContent} d-flex flex-column`} >
                                <div className={`${style.productInfo} pb-2`}>
                                    <h2 className='fw-bold'> {data.product.name}</h2>
                                    <div className='evaluation d-flex gap-2 align-items-center'>
                                        <div className='stars d-flex'>
                                            <Rating rate={4} />
                                        </div>
                                        <span className=''>{4}.00</span>
                                    </div>
                                </div>
                                <p className='pt-2'>{data.product.slug}</p>
                                <div className='price d-flex align-items-center gap-2 pb-2'>
                                    <span className={style.priceDiscount}>${data.product.finalPrice}</span>
                                    <span className={style.realPrice}>${data.product.price}</span>
                                </div>
                                <Link className={style.whatsOrder}>Order on WhatsApp</Link>
                                <div className={`${style.payment} d-flex gap-2 py-3 align-items-center`}>
                                    <button onClick={() => addProductToCart()} disabled={(loading||buyLoading)} className={`${style.cart} d-flex gap-2`}>
                                        <img src={cart} />
                                        {loading ? "Add to cart..." : "Add to cart"}</button>
                                    <button onClick={()=>buyProduct()} className={`${style.buy} d-flex gap-2`} disabled={(buyLoading||loading)}>
                                        <img src={cart} />
                                        {buyLoading ? "Buying..." : "Buy now"}
                                    </button>
                                </div>
                                <div className={`${style.directions} `}>
                                    <div className={`${style.paymentDirections} d-flex `} >
                                        <img src={payment} className='align-self-start' />
                                        <p> <span className='fw-bold'>Payment.</span> Payment upon receipt of goods, Payment by card in the department, Google Pay,
                                            Online card, -5% discount in case of payment</p>
                                    </div>
                                    <div className={`${style.safeDirections} d-flex `} >
                                        <img src={warranty} className='align-self-start' />
                                        <p> <span className='fw-bold'>Warranty.</span> The Consumer Protection Act does not provide for the return of this product of proper
                                            quality.</p>
                                    </div>
                                </div>
                                <div className='product-choice d-flex gap-3 pt-3'>
                                    <div className='wishlist d-flex align-items-center gap-2'>
                                        <img src={wishlist} className={style.choiceBorder} />
                                        <span className='d-sm-block d-none'>Add to wishlist</span>
                                    </div>
                                    <div className='share d-flex align-items-center gap-2'>
                                        <img src={share} className={style.choiceBorder} />
                                        <span className='d-sm-block d-none'>Share this Product</span>
                                    </div>
                                    <div className='compare d-flex align-items-center gap-2'>
                                        <img src={compare} className={style.choiceBorder} />
                                        <span className='d-sm-block d-none'>Compare</span>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className='product-description pt-5'>
                            <Tabs
                                defaultActiveKey="description"
                                id="uncontrolled-tab-example"
                                className="mb-3 w-100"
                            >
                                <Tab eventKey="description" title="Description" >
                                    <p className={style.productDescription}>{data.product.description}</p>
                                </Tab>
                                <Tab eventKey="reviews" title="Reviews">
                                    <div className='d-flex flex-wrap gap-2 pb-3'>
                                        {data.product.reviews.map((review) => (
                                            <div key={review._id} className={`${style.reviews} d-flex gap-3`}>
                                                <div className={`${style.review} d-flex flex-column gap-3`}>
                                                    <div className='review-header d-flex justify-content-between '>
                                                        <div className={`${style.reviewUser} d-flex flex-column`} >
                                                            <span className='fw-bold fs-5'>{review.createdBy.userName}</span>
                                                            <span>{review.createdBy.email}</span>
                                                        </div>
                                                        <div className={`${style.reviewRating} align-self-start`}>
                                                            <Rating rate={review.rating} />
                                                        </div>
                                                    </div>
                                                    <p>{review.comment}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add Review</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form onSubmit={handleSubmit(addReview)}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control as="textarea" rows={3} placeholder='Enter comment' {...register('comment', { required: "Please enter your comment" })}/>
                                                    {errors.comment ? <div className='text-danger error'>{errors.comment.message}</div> : null}
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="e">
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control type="number" placeholder="Enter rating" {...register('rating', { required: "Please enter your rating" })} />
                                                    {errors.rating ? <div className='text-danger error'>{errors.rating.message}</div> : null}
                                                </Form.Group>

                                                <Button variant="dark" type="submit" disabled={loader}>
                                                    {loader ? "Review..." : "Review"}
                                                </Button>

                                            </Form>

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="danger" onClick={handleClose}>
                                                Close
                                            </Button>
                                        
                                        </Modal.Footer>
                                    </Modal>
                                    <button className={style.reviewButton} onClick={handleShow}>Add Review</button>
                                </Tab>
                            </Tabs>
                        </div>
                        <RelatedProducts categoryId={data.product.categoryId} productId={data.product._id} />
                    </Container>
                </section>
            }
        </>
    )
}
