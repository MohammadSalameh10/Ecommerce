import React from 'react'
import Loading from '../loading/Loading';
import useFetch from '../../../hooks/useFetch';
import { Container } from 'react-bootstrap';
import Rating from '../rating/Rating';
import carts from '../../../assets/images/details/carts.svg';
import style from './relatedProducts.module.css';
import { Link } from 'react-router-dom';
export default function RelatedProducts({ categoryId, productId }) {


    const { data, error, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products/category/${categoryId}`);

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            {error ? <div className='alert alert-danger m-0'>{error}</div> :
                <section className='products'>
                    <h2 className={style.producTitle}>Related products</h2>
                    <div className={`${style.productsContent} d-flex`}>
                        {data.products.map(product => (
                            product._id !== productId &&
                            <div className={style.product} key={product._id}>
                                <img src={product.mainImage.secure_url} className={style.productImage} />
                                <h2>{product.name}</h2>
                                <Rating rate={4} />
                                <div className='price d-flex align-items-center gap-2 pb-2'>
                                    <span className={style.priceDiscount}>${product.finalPrice}</span>
                                    <span className={style.realPrice}>${product.price}</span>
                                </div>
                                <div className='buy-raleated d-flex align-items-center gap-2'>
                                    <div className={style.buy}>
                                        <Link to={`/products/${product._id}`} >
                                            <img src={carts} />
                                        </Link>
                                    </div>
                                    <span className={style.status} >{product.status}</span>
                                </div>
                            </div>
                        ))
                        }
                    </div>

                </section>
            }
        </>
    )
}
