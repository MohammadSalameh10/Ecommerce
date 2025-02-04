import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loading from '../../../components/user/loading/Loading'


export default function Products() {

    const [products, setProducts] = useState([{}])
    const [isLoading, setIsLoading] = useState(true)

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BURL}/products?limit=10`)
            setProducts(data.products)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])

    if (isLoading) {
        return <Loading />
    }
    return (
        <section className='products'>
            <Row>
                {
                    products.map(product =>
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
    )
}
