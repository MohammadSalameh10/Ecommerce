import React from 'react'
import CustomNavbar from '../../../components/user/navbar/Navbar'
import Footer from '../../../components/user/footer/Footer'
import notfound from '../../../assets/images/notFound/notFound.png'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import style from './notfound.module.css'
export default function NotFound() {
    return (
        <>
       
            <section className={style.notFound}>
                <Container>
                    <div className='d-flex flex-column align-items-center justify-content-center text-center '>
                        <img src={notfound} />
                        <h1 className='fw-bold'>That Page Cant Be Found</h1>
                        <p>
                            It looks like nothing was found at this location. Maybe try to
                            search for what you are looking for?
                        </p>
                    <Link to={'/'} >Go To Homepage</Link>
                    </div>
                </Container>
            </section>
          
        </>
    )
}
