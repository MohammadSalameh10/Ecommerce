import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { UserContext } from '../../../components/user/context/UserContext';
import Loading from '../../../components/user/loading/Loading';
import style from './photo.module.css';

export default function Photo() {
    const [photo,setPhoto] = useState(null);
    const { user, isLoading, setUser } = useContext(UserContext);
    const [photoPreview, setPhotoPreview] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [Loader, setLoader] = useState(false);
    const updatePhoto = async (data) => {
        const formData = new FormData();
        const token = localStorage.getItem('userToken');
        formData.append('image', data.image[0]);
        try {
            setLoader(true);
            const response = await axios.put(`${import.meta.env.VITE_BURL}/user/update-image`, formData,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );

            if (response.status === 200) {
                toast.success('Update Photo successfuly', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                setUser(response.data.user);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhotoPreview(URL.createObjectURL(file));
    }

    if (isLoading) {
        return <div className='w-100'>
            <Loading />
        </div>
    }

    return (
        <section className={style.photo}>
            <h1 className='fw-bold fs-4'>Account Photo</h1>
            <Form onSubmit={handleSubmit(updatePhoto)} encType='multipart/form-data'>
                <Form.Group className="d-flex flex-column gap-2 pb-3" controlId="formGroupPhoto">
                    {photoPreview ? <img src={photoPreview} /> : <img src={user.image.secure_url} />}
                    <Form.Control type="file" {...register('image', { required: "Please enter photo befor updating" })} onChange={handlePhotoChange} />
                    {errors.image ? <div className='text-danger error'>{errors.image.message}</div> : null}
                </Form.Group>
                <button type="submit" className={`${style.button} `} disabled={Loader}>{Loader ? 'updating...' : 'Update Photo'}</button>
            </Form>
        </section>
    )
}
