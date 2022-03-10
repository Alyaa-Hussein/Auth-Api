import { useHistory  } from "react-router-dom"
import { useContext, useRef } from 'react'
import useHttp from '../../Http-request/use-http'
import AuthContext from '../../store/auth-context'
import classes from './UpdateRole.module.css'

const UpdateRole = (props)=>{
    console.log("UpdateRole==>",props.roleId,props.roleName,props.roleDesc)
    const roleNameRef = useRef()
    const roleDescRef = useRef()
    //roleNameRef.current.value = props.roleName
    //roleDescRef.current.value =props.roleDesc
    
    const {sendRequest} = useHttp()
    const history = useHistory()

   const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn
    const admin = authCtx.admin
    const submitHandler = async(event)=>{
        event.preventDefault()
        const enteredName = roleNameRef.current.value
        const enteredDesc = roleDescRef.current.value
        console.log({
                name:enteredName,
                description:enteredDesc
        })
        
        const data = await sendRequest({
            url:'/roles/update-role',
            method:'POST',
            body:JSON.stringify({
                id:props.roleId,
                name:enteredName,
                description:enteredDesc
            }),

        })
       
        roleNameRef.current.value =""
        roleDescRef.current.value =""
        history.replace('/roles-list')

      }
    console.log(props.roleId)
    return(
        <section>
      
      { isLoggedIn&& admin &&<form onSubmit={submitHandler}  className={classes.role}>
          { isLoggedIn&& admin &&<h1>Add New Role</h1>}

        <div className={classes.control}>
          <label htmlFor='roleName'>New Name</label>
          <input type='text' id='roleName' required ref={roleNameRef}  defaultValue={props.roleName}/>
        </div>

        <div className={classes.control}>
          <label htmlFor='roleDesc'>New Description</label>
          <textarea type='text' id='roleDesc' className={classes.roleDesc} required ref={roleDescRef} defaultValue={props.roleDesc} />
        </div>

   
        <div className={classes.actions}>
           <button>Change</button>
        </div>

      </form>}
    </section>


    )

}
export default UpdateRole