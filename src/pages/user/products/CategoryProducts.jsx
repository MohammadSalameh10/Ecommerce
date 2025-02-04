import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/user/loading/Loading';
import useFetch from '../../../hooks/useFetch';

export default function CategoryProducts() {

    const { categoryId } = useParams();
    const { data, error, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products/category/${categoryId}`);

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            {error ? <div className='alert alert-danger m-0'>{error}</div> :
                <section className='products'>
                    <Row>
                        {
                            data.products.map(product =>
                                <div className='col-md-3' key={product._id}>
                                    <div className='product'>
                                        <img src={product.mainImage.secure_url} />
                                        <h2>{product.name}</h2>
                                    </div>
                                </div>
                            )
                        }
                    </Row>
                </section>
            }
        </>
    )
}
