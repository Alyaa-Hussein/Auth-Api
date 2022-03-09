import { useLocation, useParams } from "react-router-dom"
import UpdateRole from "../components/Roles/UpdateRole"

const UpdateRolePage  = ()=>{
    const {id} = useParams()
    const {name} = useParams()
    const {description} = useParams()
    console.log("hello from update role",id ,name,description)
    return(
        <UpdateRole roleId={id} roleName={name} roleDesc={description}></UpdateRole>
    )
    
}

export default UpdateRolePage