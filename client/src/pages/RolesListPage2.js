import { useContext, useEffect, useState } from "react"
import useHttp from "../Http-request/use-http"
import RolesList from "../components/Roles/RolesList"
import AuthContext from "../store/auth-context"
//{id:'m1',name:'driver',description:'drive'},{id:'m2',name:'driver',description:'drive'}
const RolesListPage = ()=>{
    const [roles,setRolse] = useState([{id:'m1',name:'driver',description:'drive'},{id:'m2',name:'driver',description:'drive'}])
    const {isLoading,error,sendRequest} = useHttp()
    console.log('hello from RolesListPage')
    const authCtx = useContext(AuthContext)
    /*
   
    useEffect(()=>{
        //let fetchRoles = async()=>{}
        
        console.log("Hello fro=m  usw effect")
        const fetchRoles = async()=>{
            console.log("hello from fetch data")
            const rolesData = await sendRequest({
                url:'/roles',
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':authCtx.token

                }
            })
            const loadedRolesData = []
            for(const key in rolesData.roles){
                loadedRolesData.push(rolesData.roles[key])
            }
            setRolse(loadedRolesData)
            

            console.log(loadedRolesData,"==========",rolesData)


        }
        fetchRoles()
    },[fetchRoles,authCtx.token])*/
    
    console.log("roles from RolesListPage",roles)
    
    return(
        <RolesList roles={roles}></RolesList>
    )

}

export default RolesListPage