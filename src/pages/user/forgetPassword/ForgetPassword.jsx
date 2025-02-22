import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import style from './forgetPassword.module.css'

export default function ForgetPassword() {

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');
  const forgetPassword = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BURL}/auth/sendcode`, value);
      if (response.status === 200) {
        if(userToken){
          navigate('/changePassword');
        }else{
          navigate('/auth/changePassword');
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        setServerError(error.response.data.message);
      } else {
        setServerError("server error");
      }

    } finally {
      setIsLoading(false);
    }
  }


  return (
    <section className={`${style.forgetPassword}`}>
      <Container>

        <Form onSubmit={handleSubmit(forgetPassword)} className={`${style.form} m-auto d-flex flex-column `}>
        <div className='d-flex flex-column gap-1'>
          <div className={`${style.authentication} d-flex justify-content-center align-items-center`}>
            <span>Forget Password</span>
          </div>
          <p className='text-center m-0'>Enter your email to send code.</p>
        </div>
          <Form.Group className="mb-2" controlId="email">
            <Form.Label className={`${style.label}`} >Email address *</Form.Label>
            <Form.Control type="email" placeholder="" {...register('email', { required: "Please enter your email" })} />
            {errors.email ? <div className='text-danger error'>{errors.email.message}</div> : null}
          </Form.Group>

          <Button type='submit' className={`${style.button} w-100`} disabled={isLoading}>{isLoading ? "Sending..." : "Send Code"}</Button>
          {serverError ? <div className='text-danger text-center error'>{serverError}</div> : null}
        </Form>
      </Container>
    </section>
  )
}
