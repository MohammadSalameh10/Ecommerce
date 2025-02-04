import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loading from '../../../components/user/loading/Loading'
import useFetch from '../../../hooks/useFetch'


export default function Products() {
    const { data, error, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products?limit=10`);
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
                                        <Link to={`/products/${product._id}`}>Details</Link>
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
