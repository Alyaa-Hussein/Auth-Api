import { useHistory } from "react-router-dom"
import classes from './RolesList.module.css'
import RoleListItem from "./RoleListItem"


const RolesList =(props)=>{
    const history = useHistory()
    const onAddNewRoleHandler = ()=>{
        history.push('/add-new-role')

    }
    
    return(
        <section className={classes.section}>
            <ul className={classes.list}>
                {props.roles.map((role)=>(
                    
                    <RoleListItem
                    key={role._id}
                    id={role._id}
                    name={role.name}
                    block={role.name === 'Tester' || role.name ==='Developer' || role.name ==='No Role'? true:false}
                    description={role.description}
                    deleteItem={props.deleteItemHandler}/>

                ))}
              

            </ul>
            <button onClick={onAddNewRoleHandler} className={classes.button}>Add New Role</button>
        </section>
    
    )

}


export default RolesList