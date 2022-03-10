import classes from './RoleListItem.module.css'
//import { useContext, useRef, useState } from 'react'
import useHttp from '../../Http-request/use-http'
//import AuthContext from '../../store/auth-context'
import Card from '../UI/Card'
import { Link } from 'react-router-dom'

const RoleListItem = (props)=>{
    //const authCtx = useContext(AuthContext)
    const {sendRequest} = useHttp()
    const onDeleteHandler = async()=>{
        const data = await sendRequest({
            url:'/delete-role',
            method:'DELETE',
            body:JSON.stringify({
                id:props.id,
            
            }),
        

        })
      //  console.log("DLETED",data)
        props.deleteItem()
    
    }
    //console.log("props Block",props.block)
    
    return(
        <li className={classes.item}>
            <Card>
                <h3>{props.name}</h3>
                <h4>{props.description}</h4>
                {!props.block&&<Link to={`/${props.id}/${props.name}/${props.description}`} className={classes.link}>Update</Link>}
                <br></br>
                {!props.block&&<button className={classes.button}onClick={onDeleteHandler}>Delete</button>}
            </Card>

        </li>
        

    )
}

export default RoleListItem