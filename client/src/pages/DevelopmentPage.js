import { useEffect, useState } from 'react'
import useHttp from '../Http-request/use-http'
//import AuthContext from '../store/auth-context'
import classes from './Styles.module.css'

const DevelopmentPage= ()=>{
    const {sendRequest, error}= useHttp()
   // const authCtx = useContext(AuthContext)
    const [data, setData] = useState()
    useEffect(()=>{
        const fetchData = async()=>{
            await sendRequest({
                url:'/devplan',
    
            }).then(data =>{
                if(data){
                    setData(data.plan)

                }
            })
            
        }
        fetchData()


    },[sendRequest])

    return(
        <div>
            { !error && <div className={classes.item}>
            <h1>This is the development plan</h1>
            <br/>
            <p>
                {data}
            </p>

        </div>}
        {error && <h1>You are not authorized to access this page</h1>}
        </div>
    
    )
}

export default DevelopmentPage
