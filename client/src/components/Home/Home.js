import classes from './Home.module.css'
import { Link } from 'react-router-dom'

/*<div>
<h3>Your email is: {info.email} </h3>
{!info.admin && <h3>Your Role is: {info.userRole.name} </h3>}
{!info.admin && <h4>{info.userRole.description}</h4>}
{info.admin && <h3>You are the admin of the app ;)</h3>}
   
</div>*/

const Home = (props)=>{
   const info= props.userInfo
   const role= info.userRole.name
   let Content
   if (!info.admin){
       Content = <div >
           <h3>Your Role is: {info.userRole.name} </h3>
           <h4>{info.userRole.description}</h4>
           {role === 'Developer' && <Link className={classes.style} to='/development'> Development Plan </Link>}
           {role === 'Tester' && <Link className={classes.style} to='/testing'> Testing Plan </Link> }
       </div>
   }else if (info.admin)
   {
       Content= <div>
           <h3>You are the admin of the app ;)</h3>
       </div>
   }
    return (
        <section className={classes.detail}>
            <h1>Hello, welocome to the application</h1>
            <div className={classes.info}>
            <h2>Your Info </h2>
            <h3>Your email is: {info.email} </h3>
           {Content}
            </div>
            
        </section>
    )
}

export default Home