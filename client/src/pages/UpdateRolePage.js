import {  useParams } from "react-router-dom"
import UpdateRole from "../components/Roles/UpdateRole"

const UpdateRolePage  = ()=>{
    const {id} = useParams()
    const {name} = useParams()
    const {description} = useParams()
    return(
        <UpdateRole roleId={id} roleName={name} roleDesc={description}></UpdateRole>
    )
    
}

export default UpdateRolePage