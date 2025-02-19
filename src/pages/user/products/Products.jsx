import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loading from '../../../components/user/loading/Loading'
import Pagination from 'react-bootstrap/Pagination';
import Rating from '../../../components/user/rating/Rating'
import axios from 'axios'
import style from './products.module.css'


export default function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(99999);
    const getProducts = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BURL}/products?page=${currentPage}&limit=5&sort=${sort}&search=${search}&price[gte]=${minPrice}&price[lte]=${maxPrice}`);
            setData(data);
            setError(null)
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }


    const numberOfPages = Math.ceil(data.total / 5);

    const nextPage = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handelSort = (e) => {
        setSort(e.target.value);
    }
    const handelfilter = (e) => {
        e.preventDefault();
        getProducts();
    }
    useEffect(() => {
        getProducts();
    }, [currentPage, sort]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {error ? <div className='alert alert-danger m-0'>{error}</div> :
                <section className={`${style.products}`}>
                    <Container>
                        <div className={`${style.productFilter}`}>
                            <Form className='d-flex align-items-center justify-content-between gap-2 '>
                                <Form.Select className={style.sortFilter} onChange={handelSort} value={sort} >
                                    <option value=" ">Default</option>
                                    <option value="name">A-Z</option>
                                    <option value="-name">Z-A</option>
                                    <option value="price">Lowest price to highest price</option>
                                    <option value="-price">Highest price to lowest price</option>
                                    <option value="discount">Lowest discount to highest discount</option>
                                    <option value="-discount">Highest discount to lowest discount</option>
                                </Form.Select>

                                <div className={`${style.priceFilter} d-flex gap-2 align-items-center justify-content-center `}>
                                    <span>Min</span>
                                    <Form.Control type="text" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                    <span>Max</span>
                                    <Form.Control value={maxPrice} type="text" onChange={(e) => setMaxPrice(e.target.value)} />
                                    <button className={style.goButton} onClick={handelfilter}>Go</button>
                                </div>

                                <Form.Group controlId="search">
                                    <Form.Control type="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                </Form.Group>
                                <button className={style.searchButton} onClick={handelfilter}>Search</button>

                            </Form>
                        </div>

                        <h2 className={`${style.productTitle} mt-3`}>All Products</h2>
                        <div className={`${style.productsContent} d-flex gap-2 flex-wrap`}>
                            {
                                data.products.map(product =>
                                    <div className={`${style.product} d-flex flex-column gap-1`} key={product._id}>
                                        <span className={style.discount}>{product.discount}%</span>
                                        <div className='text-center'>
                                            <img src={product.mainImage.secure_url} width={200} />
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
                        <div className='d-flex justify-content-center pt-5'>
                            <Pagination >
                                <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
                                {[...Array(numberOfPages)].map((_, index) => (
                                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={nextPage} disabled={currentPage === numberOfPages} />
                            </Pagination>
                        </div>
                    </Container>
                </section>
            }
        </>
    )
}
