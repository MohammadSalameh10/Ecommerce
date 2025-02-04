import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../../components/user/loading/Loading';
import useFetch from '../../../hooks/useFetch';
import style from './categories.module.css';
export default function Categories() {
  const { data, error, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/categories/active`);
  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      {error ? <div className='alert alert-danger m-0'>{error}</div> :
        <section className={style}>
          <Container>
            <div className='d-flex justify-content-center gap-3'>
              {data.categories.map(category =>
                <div className='' key={category._id}>
                  <Link to={`/categories/${category._id}`}>
                    <div className='category'>
                      <img src={category.image.secure_url}  />
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </Container>

        </section>}
    </>
  )
}
