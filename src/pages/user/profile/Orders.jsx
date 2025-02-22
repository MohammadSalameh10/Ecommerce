import React, { useEffect, useState } from 'react'
import style from './orders.module.css';
import axios from 'axios';
import Loading from '../../../components/user/loading/Loading';
import { Button } from 'react-bootstrap';
import { Slide, toast } from 'react-toastify';
export default function Orders() {
  const token = localStorage.getItem('userToken');
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  const getOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BURL}/order`,
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }

      );
      setOrders(response.data.orders)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const cancelOrder = async (orderID) => {
    try{
      const response = await axios.patch(`${import.meta.env.VITE_BURL}/order/cancel/${orderID}`,
        null,
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      )
      if(response.status === 200){
        toast.success('Order cancel successfuly', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
      });
      setOrders(orders.filter(order => order._id !== orderID))
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
  }, [])

  if (isLoading) {
    return <div className='w-100'><Loading /></div>
  }
  return (
    <section className={style.orders}>
      <h1 className='fw-bold fs-5 pb-2'>My Orders</h1>
      <div className='d-flex flex-column gap-3'>
      {orders.map(order =>
         order.status !== 'cancelled' &&
        <div key={order._id} className={`${style.order} pb-3`}>
          <div className={`${style.orderInfo} d-flex justify-content-between`}>
            <h2><span className={style.orderID}>Order ID: </span>{order._id}</h2>
            <div className={`${style.orderStatus} d-flex flex-column`}>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
              {order.status === 'pending' ? <span className='text-end text-warning fw-bold'>{order.status}</span> : <span className='text-end text-success fw-bold'>{order.status}</span>}
              
            </div>
          </div>
          <div className={`${style.orderProducts} pb-2`} >
            {order.products.map(product =>
              <div key={product._id} >
                <div className={`${style.orderDetails} d-flex align-items-center justify-content-between gap-1`}>
                  <div className={`${style.orderData} d-flex align-items-center gap-3`}>
                  <img src={product.productId.mainImage.secure_url} width={100} />
                  <div className='d-flex flex-column'>
                    <h3 className='fs-6'>{product.productId.name}</h3>
                    <span>Qty: {product.quantity}</span>
                  </div>
                  </div>
                  <span>${product.finalPrice}</span>
                </div>
              </div>
            )}
          </div>
          <div className={`${style.orderPayment} pt-2 d-flex flex-column gap-3`}>
            <div className='d-flex justify-content-between'>
              <span className='fw-bold'>Payment Method</span>
              <span>{order.paymentType}</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='fw-bold'>Total</span>
              <span>
              ${ order.products.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0)}</span>
            </div>
            {(order.status === 'pending')?  <Button className='btn btn-danger' onClick={()=>cancelOrder(order._id)}>Cancel</Button>:''}
          </div>
        </div>
      )}
      </div>
    </section>
  )
}
