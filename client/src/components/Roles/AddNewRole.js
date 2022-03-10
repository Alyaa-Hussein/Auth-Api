import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import useHttp from '../../Http-request/use-http'
import AuthContext from '../../store/auth-context'
import classes from './AddNewRole.module.css'

const AddNewRole = ()=>{

    const roleNameRef = useRef()
    const roleDescRef = useRef()
    const {isLoading,error,sendRequest} = useHttp()
    const [isError , setError] = useState(false)
    const history = useHistory()

    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn
    const admin = authCtx.admin


  const clearInput = ()=>{
  //  console.log('hello')
    setError(false)
    roleNameRef.current.value =''
    roleDescRef.current.value =''
  }

    const submitHandler = async(event)=>{
        event.preventDefault()
        const enteredName = roleNameRef.current.value
        const enteredDesc = roleDescRef.current.value
        
        sendRequest({
          url:'/roles/add-new-role',
          method:'POST',
          body:JSON.stringify({
              name:enteredName.toLowerCase(),
              description:enteredDesc
          })

      }).then(data=>{
        if(data){
          clearInput()
          history.replace('/roles-list')

        }
        else{
          setError(true)
        }
      })
   
        

       /* const data = await sendRequest({
            url:'/roles/add-new-role',
            method:'POST',
            body:JSON.stringify({
                name:enteredName,
                description:enteredDesc
            })


        })
     
        roleNameRef.current.value =""
        roleDescRef.current.value =""
        if(!error){
          history.replace('/roles-list')

        }*/

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
        {isLoading && <p>Loading...</p>}
        {isError && !isLoading && <p>Role already exists !!</p>}
   
        <div className={classes.actions}>
           <button>Add</button>
        </div>

      </form>}
    </section>
    )

}
export default AddNewRole