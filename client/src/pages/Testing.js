import classes from './Styles.module.css'
import { useContext, useEffect, useState } from 'react'
import useHttp from '../Http-request/use-http'
import AuthContext from '../store/auth-context'

const TestingPage= ()=>{

    const {sendRequest, error}= useHttp()
    const authCtx = useContext(AuthContext)
    const [data, setData] = useState()

    useEffect(()=>{
        const fetchData = async()=>{
            const data = await sendRequest({
                url:'/testplan',
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':authCtx.token
                }
            })
            
            setData(data.plan)
        }
        fetchData()


    },[sendRequest, authCtx.token])
    return(
        <div>
            {!error && <div className={classes.item}>
            <h1>This is the testing plan</h1>
            <br/>
            <p>
                {data}
            </p>

        </div>}
        {error && <h1>You are not authorized to access this page</h1>}

        </div>
        
    )
}

export default TestingPage
