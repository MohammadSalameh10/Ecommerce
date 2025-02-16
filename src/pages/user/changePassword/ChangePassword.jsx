import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { Slide, toast } from 'react-toastify';
import style from './changePassword.module.css'
export default function ChangePassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const userToken = localStorage.getItem('userToken');

    const changePassword = async (value) => {
      setIsLoading(true);
      try {
        const response = await axios.patch(`${import.meta.env.VITE_BURL}/auth/forgotPassword`, value);
        if (response.status === 200) {
          toast.success('password change successfuly', {
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
         if(userToken){
          navigate('/profile/info');
         }else{
           navigate('/auth/login');
         }
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
    <section className={`${style.changePassword}`}>
      <Container>
       <div className='d-flex flex-column gap-1'>
                 <div className={`${style.authentication} d-flex justify-content-center align-items-center`}>
                   <span>Change Password</span>
                 </div>
                 <p className='text-center m-0'>Enter your information to change password</p>
               </div>
        <Form onSubmit={handleSubmit(changePassword)} className={`${style.form} m-auto d-flex flex-column`}>

          <Form.Group className="mb-1" controlId="email" >
            <Form.Label className={`${style.label}`} htmlFor='email'>Email address *</Form.Label>
            <Form.Control type="email" placeholder="" {...register('email', { required: "Please enter your email" })} />
            {errors.email ? <div className='text-danger error'>{errors.email.message}</div> : null}
          </Form.Group>

          <Form.Group className="mb-1" controlId="password" >
            <Form.Label className={`${style.label}`} htmlFor='password'>New Password *</Form.Label>
            <Form.Control type="password" placeholder="" {...register('password', { required: "Please enter your password" })} />
            {errors.password ? <div className='text-danger error'>{errors.password.message}</div> : null}
          </Form.Group>

          <Form.Group className="mb-1" controlId="code" >
            <Form.Label className={`${style.label}`} htmlFor='code'>Code *</Form.Label>
            <Form.Control type="text" placeholder="" {...register('code', { required: "Please enter your code" })} />
            {errors.code ? <div className='text-danger error'>{errors.code.message}</div> : null}
          </Form.Group>

          <Button type='submit' className={`${style.button} w-100`} disabled={isLoading}>{isLoading ? "changing..." : "Change Password"}</Button>
          {serverError ? <div className='text-danger text-center error'>{serverError}</div> : null}
        </Form>
      </Container>
    </section>
  )
}
