import AuthContext from "../store/auth-context";
import useHttp from "../Http-request/use-http";
import {  useContext, useEffect, useState } from "react";
import RolesList from "../components/Roles/RolesList";

const RolesListPage = () => {
    const [roles,setRoles]= useState([])
    const {sendRequest, error}= useHttp()
    const authCtx= useContext(AuthContext)
    const admin = authCtx.admin
    const [itemDeleted,setItemDeleted] = useState(false)
    let onDeleteItemHandler = ()=>{
        setItemDeleted(!itemDeleted)
        //console.log("itemDeletes",itemDeleted)
            
    }
    
    useEffect(()=>{
        const getRole= async()=>{
            const data = await sendRequest({
                url:'/roles',

            })
            setRoles(data)
        }
        getRole()
      

    },[sendRequest,authCtx.token,itemDeleted])


  return(
      <div>
          {admin && !error &&<RolesList roles={roles} deleteItemHandler={onDeleteItemHandler}></RolesList>}
          {error && <h1>You are not authorized to access this page</h1>}
      </div>
      
  )
};

export default RolesListPage;