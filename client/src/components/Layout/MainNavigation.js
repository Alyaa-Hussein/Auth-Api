import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';
import useHttp from '../../Http-request/use-http';

const MainNavigation = () => {
  const history = useHistory()
  const {sendRequest}= useHttp()

  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  const admin = authCtx.admin
  //console.log("Main navigation",admin)

  function logoutHandler(){
    authCtx.logout()
   
   const data =  sendRequest({
      url:'/users/logout',
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':authCtx.token
      }
    })
    history.replace('/auth')
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn &&
            <li>
              <Link to='/Home'>Home</Link>
            </li>}
          {isLoggedIn && admin &&
            <li>
              <Link to='/roles-list'>Roles</Link>
            </li>}
          {isLoggedIn &&  admin &&
            <li>
              <Link to='/users'>Users </Link>
            </li>}
          {isLoggedIn &&
            <li>
              {<button onClick={logoutHandler}>Logout</button>}
            </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
