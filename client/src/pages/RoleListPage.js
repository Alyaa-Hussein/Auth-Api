import AuthContext from "../store/auth-context";
import useHttp from "../Http-request/use-http";
import { useContext, useEffect, useState } from "react";

const RolesListPage = () => {
    const [roles,setRoles]= useState([])
    const {sendRequest}= useHttp()
    const authCtx= useContext(AuthContext)


    useEffect(()=>{
        const getRole= async()=>{
            const data = await sendRequest({
                url:'/roles',
                method:'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':authCtx.token
                },
            })

            setRoles(data)

        }
        getRole()
    },[sendRequest,authCtx.token])


  return <div></div>;
};

export default RolesListPage;
