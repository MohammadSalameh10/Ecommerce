import axios from "axios";
import {useEffect } from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        getCart();
    }, [])
    const getCart = async () => {
        const token = localStorage.getItem('userToken');
        try {
            const response = await axios.get(`${import.meta.env.VITE_BURL}/cart`,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );
        
            setCartCount(response.data.count);

        } catch (error) {
          
            console.log(error);
        }
    }
    return <CartContext.Provider value={{ cartCount , setCartCount }}>
            {children}
        </CartContext.Provider>
    
}

export default CartContextProvider;