import React from 'react'
import Loading from '../loading/Loading';
import useFetch from '../../../hooks/useFetch';
import Rating from '../rating/Rating';
import carts from '../../../assets/images/details/carts.svg';
import style from './relatedProducts.module.css';
import { Link, useParams } from 'react-router-dom';
export default function RelatedProducts({ categoryId, productId }) {


    const { data, error, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products/category/${categoryId}`);

    const goToProduct = () => {
        const params = useParams();
    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            {error ? <div className='alert alert-danger m-0'>{error}</div> :
                <section className='products'>
                    <h2 className={style.producTitle}>Related products</h2>
                    <div className={`${style.productsContent} d-flex gap-2 flex-wrap`}>
                        {data.products.map(product => (
                            product._id !== productId &&
                            <div className={`${style.product} d-flex flex-column gap-1`} key={product._id}>
                                <span className={style.discount}>{product.discount}%</span>
                                <div className='text-center'>
                                    <img src={product.mainImage.secure_url} className={style.productImage} />
                                </div>
                                <h2>{product.name}</h2>
                                <div className='d-flex'>
                                    <Rating rate={4} />
                                </div>
                                <div className='price d-flex align-items-center gap-2 py-2'>
                                    <span className={style.priceDiscount}>${product.finalPrice}</span>
                                    <span className={style.realPrice}>${product.price}</span>
                                </div>
                                <div className='h-100 d-flex align-items-end'>
                                    <div className={`${style.buyRelated} d-flex align-items-center gap-2`}>
                                        <div className={style.buy}>
                                            <Link to={`/products/${product._id}`} onClick={ ()=>goToProduct()} >
                                                <img src={carts} />
                                            </Link>
                                        </div>
                                        <span className={style.status} >{product.status}</span>
                                    </div>
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
