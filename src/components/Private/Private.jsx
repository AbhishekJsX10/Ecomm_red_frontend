
import React, { useEffect, useState } from 'react'
import {useAuth} from "../../context/auth"
import {Outlet} from "react-router-dom"
import axios from 'axios'
import Spinner from "../Spinner"

function PrivateRoute(){

    const {auth,setAuth} = useAuth()
    const [ok,setOk] = useState(false)

    useEffect(()=>{
        const authCheck = async() =>{
            const res = await axios.get("https://ecomm-red.onrender.com/api/v1/auth/user-auth")
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)                                                                                    
            }
        }
        if(auth?.token) authCheck()
    },[auth])

    return ok ? <Outlet/>:<Spinner/>
}

export default PrivateRoute