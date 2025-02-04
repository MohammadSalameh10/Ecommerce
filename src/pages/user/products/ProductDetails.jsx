import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../../components/user/loading/Loading';
import useFetch from '../../../hooks/useFetch';

export default function ProductDetails() {
    const { productId } = useParams();
    const { data, error, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products/${productId}`);
    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            {error ? <div className='alert alert-danger m-0'>{error}</div> :
                <section className='product'>
                    <div className='product'>
                        <img src={data.product.mainImage.secure_url} className='w-25' />
                        <h2>{data.product.name}</h2>
                    </div>
                </section>
            }
        </>
    )
}
