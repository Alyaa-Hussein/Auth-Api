import AuthContext from "../store/auth-context";
import useHttp from "../Http-request/use-http";
import { useCallback, useContext, useEffect, useState } from "react";
import RolesList from "../components/Roles/RolesList";

const RolesListPage = () => {
    const [roles,setRoles]= useState([])
    const {sendRequest}= useHttp()
    const authCtx= useContext(AuthContext)
    const admin = authCtx.admin
    const [itemDeleted,setItemDeleted] = useState(false)
    let onDeleteItemHandler = ()=>{
        setItemDeleted(true)
        console.log("itemDeletes",itemDeleted)
            
    }
    


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
            console.log("rolesData=>",data)
            console.log("kkkkkkkkk",data)
            setRoles(data)

        }
        getRole()
      

    },[sendRequest,authCtx.token,itemDeleted])


  return(
      <div>
          {admin&&<RolesList roles={roles} deleteItemHandler={onDeleteItemHandler}></RolesList>}
      </div>
      
  )
};

export default RolesListPage;
