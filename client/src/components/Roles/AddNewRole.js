import { useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import useHttp from '../../Http-request/use-http'
import AuthContext from '../../store/auth-context'
import classes from './AddNewRole.module.css'

const AddNewRole = ()=>{

    const roleNameRef = useRef()
    const roleDescRef = useRef()
    const {isLoading,error,sendRequest} = useHttp()
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
            url:'/roles/add-new-role',
            method:'POST',
            body:JSON.stringify({
                name:enteredName,
                description:enteredDesc
            }),
            headers:{
                'Content-Type':'application/json',
                'Authorization':authCtx.token
            }

        })
        if(data){
          console.log("Our data=>",data)
        }else{
          console.log("Our error=>",error)

        }  
        roleNameRef.current.value =""
        roleDescRef.current.value =""
        history.replace('/roles-list')

      }
    return(
    <section>
      
      { isLoggedIn&& admin &&<form onSubmit={submitHandler}  className={classes.role}>
          { isLoggedIn&& admin &&<h1>Add New Role</h1>}

        <div className={classes.control}>
          <label htmlFor='roleName'>Role Name</label>
          <input type='text' id='roleName' required ref={roleNameRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor='roleDesc'>Role Description</label>
          <textarea type='text' id='roleDesc' className={classes.roleDesc} required ref={roleDescRef} />
        </div>

   
        <div className={classes.actions}>
           <button>Add</button>
        </div>

      </form>}
    </section>
    )

}
export default AddNewRole

/*
{isLoading && <p>Loading...</p>}
*/