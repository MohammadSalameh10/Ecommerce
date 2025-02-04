import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../../components/user/loading/Loading';

export default function Categories() {

    const [categories, setCategories] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    const getCategories = async () => {
      try{
        const {data} = await axios.get(`${import.meta.env.VITE_BURL}/categories/active`);
        setCategories(data.categories);
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    }

    useEffect(()=>{
        getCategories();
    },[])


    if(isLoading){
        return <Loading />
    }
  return (
   <section className='categories'>
    <Row>
        {categories.map( category =>
            <div className='col-md-3' key={category._id}>
              <Link to={`/categories/${category._id}`}>
                <div className='category'>
                    <img src={category.image.secure_url} className='w-25' />
                </div>
                </Link>
            </div>
        )}
    </Row>
   </section>
  )
}
