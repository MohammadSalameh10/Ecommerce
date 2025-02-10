import React from 'react'
import useFetch from '../../../hooks/useFetch';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../loading/Loading';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import style from './category.module.css';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Category() {
    const { data, error, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/categories/active`);
    if (isLoading) {
        return <Loading />
    }
    return (
        <section className={style.category}>
            <Container>

                <Swiper
                    modules={[Navigation]}
                    navigation
                    slidesPerView={3}
                    loop={true}

                >

                    {data.categories.map(category =>
                        <SwiperSlide key={category._id} className='text-center'  >
                            <Link to={`/categories/${category._id}`}>
                                <img src={category.image.secure_url} width={90} />
                            </Link>
                        </SwiperSlide>
                    )
                    }
                </Swiper>
            </Container>

        </section>
    )
}
