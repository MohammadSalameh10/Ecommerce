import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        getUser();
    }, [])
    const getUser = async () => {
        const token = localStorage.getItem('userToken');
        try {
            const respnse = await axios.get(`${import.meta.env.VITE_BURL}/user/profile`, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            })
            setUser(respnse.data.user);
        } catch (error) {
            console.log(error);
        }
    }


    return <UserContext.Provider value={{ user , setUser}}>
        {children}
    </UserContext.Provider>
}
export default UserContextProvider;