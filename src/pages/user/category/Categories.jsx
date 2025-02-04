import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../../components/user/loading/Loading';
import useFetch from '../../../hooks/useFetch';

export default function Categories() {
  const { data, error, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/categories/active`);
  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      {error ? <div className='alert alert-danger m-0'>{error}</div> : 
      <section className='categories'>
        <Row>
          {data.categories.map(category =>
            <div className='col-md-3' key={category._id}>
              <Link to={`/categories/${category._id}`}>
                <div className='category'>
                  <img src={category.image.secure_url} className='w-25' />
                </div>
              </Link>
            </div>
          )}
        </Row>
      </section>}
    </>
  )
}
