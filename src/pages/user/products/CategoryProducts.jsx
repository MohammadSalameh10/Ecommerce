import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../components/user/loading/Loading';
import useFetch from '../../../hooks/useFetch';
import style from './categoryProducts.module.css';
import Rating from '../../../components/user/rating/Rating';
export default function CategoryProducts() {

    const { categoryId } = useParams();
    const { data, error, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products/category/${categoryId}`);

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            {error ? <div className='alert alert-danger m-0'>{error}</div> :
                <section className={`${style.products}`}>
                    <Container>
                        <div className={`${style.productsContent} d-flex gap-2 flex-wrap`}>
                            {
                                data.products.map(product =>
                                    <div className={`${style.product} d-flex flex-column gap-2`} key={product._id}>
                                        <span className={style.discount}>{product.discount}%</span>
                                        <div className='text-center'>
                                            <img src={product.mainImage.secure_url} />
                                        </div>
                                        <h2 className='fs-6'>{product.name}</h2>
                                        <div>
                                            <Rating rate={4} />
                                        </div>
                                        <div className='price d-flex align-items-center gap-2 pb-2'>
                                            <span className={style.priceDiscount}>${product.finalPrice}</span>
                                            <span className={style.realPrice}>${product.price}</span>
                                        </div>
                                        <div className={`${style.detailsButton} d-flex align-items-end`}>
                                            <Link to={`/products/${product._id}`} className={style.details} onClick={() => window.scroll(0, 0)}>Details</Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Container>

                </section>
            }
        </>
    )
}
