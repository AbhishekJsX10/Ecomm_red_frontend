import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import AdminMenu from "../../components/layout/AdminMenu"


export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const {auth, setAuth} = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("https://ecomm-red.onrender.com/api/v1/auth/admin-auth",{headers:{
        "Authorization": auth.token
      }});
      console.log(res.data)
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth.token) authCheck();

    // if(auth.user.role === 1) setOk(true)
    
  }, [auth]);

  return ok ? <Outlet/>: <Spinner path=""/>;
}

