import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../../components/user/loading/Loading';

export default function ProductDetails() {
  const {productId} = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getProducts = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BURL}/products/${productId}`)
        setProduct(data.product)
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
  <section className='product'>
    <div className='product'>
    <img src={product.mainImage.secure_url} className='w-25' />
        <h2>{product.name}</h2>
    </div>
  </section>
  )
}
