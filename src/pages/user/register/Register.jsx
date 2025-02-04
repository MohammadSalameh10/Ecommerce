import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, Slide, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import style from './register.module.css';
export default function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const registerUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/signup`, value);
      if (response.status === 201) {
        toast.info('please check your email', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        navigate('/auth/login');
      }
    } catch (error) {
      if (error.response.status === 409) {
        setServerError("Email already exists");
      } else {
        setServerError("server error");
      }
    } finally {
      setIsLoading(false);
    }

  }
  return (
    <section className={`${style.register}`}>
      <Container>
        <div className='d-flex flex-column gap-3'>
          <div className={`${style.authentication} d-flex justify-content-center align-items-center gap-4`}>
            <Link to={'/auth/login'}>Login</Link>
            <Link to={'/auth/register'}>Register</Link>
          </div>
          <p className='text-center'>There are many advantages to creating an account: the payment process is
            faster, shipment tracking is possible and much more.</p>
        </div>
        <Form onSubmit={handleSubmit(registerUser)} className={`${style.form} m-auto d-flex flex-column `}>

       
          <Form.Group className="mb-1" controlId="formGroupUser" >
            <Form.Label className={`${style.label}`}>Username *</Form.Label>
            <Form.Control type="text" placeholder="" {...register('userName', { required: "Please enter your username" })} />
            {errors.userName ? <div className='text-danger error'>{errors.userName.message}</div> : null}
          </Form.Group>

          <Form.Group className="mb-1" controlId="formGroupEmail" >
            <Form.Label className={`${style.label}`}>Email address *</Form.Label>
            <Form.Control type="email" placeholder="" {...register('email', { required: "Please enter your email" })} />
            {errors.email ? <div className='text-danger error'>{errors.email.message}</div> : null}
          </Form.Group>

          <Form.Group className="mb-1" controlId="formGroupPassword" >
            <Form.Label className={`${style.label}`}>Password *</Form.Label>
            <Form.Control type="password" placeholder="" {...register('password', { required: "Please enter your password" })} />
            {errors.password ? <div className='text-danger error'>{errors.password.message}</div> : null}
          </Form.Group>
          <div className= {`${style.choose}  d-flex flex-column gap-1`}>
            <div className='d-flex align-items-center gap-2'>
            <input type="radio" id="customer" name="user_type"  />
            <label htmlFor="customer" className={`${style.label}`}>I am a customer</label>

            </div>
            <div className='vendor d-flex align-items-center gap-2'>
            <input type="radio" id="vendor" name="user_type"  />
           <label htmlFor="vendor" className={`${style.label}`}>I am a vendor</label>
            </div>
              <p className='pt-2'>Your personal data will be used to support your experience throughout this
                website, to manage access to your account, and for other purposes described in
                our <span> privacy policy.</span></p>
          </div>
         
          <Button type='submit' className={`${style.button} w-100`} disabled={isLoading}>{isLoading ? "Loading..." : "Register"}</Button>
          {serverError ? <div className='text-danger text-center error'>{serverError}</div> : null}
        </Form>
      </Container>
    </section>
  )
}
