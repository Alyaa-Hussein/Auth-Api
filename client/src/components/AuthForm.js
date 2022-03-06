import { useState, useRef, useContext } from 'react';
import useHttp from '../Http-request/use-http';
import { useHistory } from 'react-router';
import AuthContext from '../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {


  const emailInputRef = useRef()
  const passInputRef = useRef()
  const nameInputRef = useRef()

  const authCtx= useContext(AuthContext)
  const history = useHistory()
  const {isLoading,error,sendRequest}= useHttp()

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) =>{
    event.preventDefault()

    const enterdEmail = emailInputRef.current.value
    const enteredPass = passInputRef.current.value
    
    let url
    if (isLogin) {
      url='/users/login'
      const data =await sendRequest({
        url:url,
         method:'POST',
         body:JSON.stringify( {
          email: enterdEmail,
          password: enteredPass,
        }),
          headers:{
        'Content-Type':'application/json'
      },
    })

    console.log(data.token)
    console.log("hello admin",data.user.admin)

    authCtx.login(data.token,data.user.admin)
    
   
    history.replace('/home')
    

    } else {
      const enteredName = nameInputRef.current.value
      url='/users'
      const data =sendRequest({
        url:url,
         method:'POST',
         body:JSON.stringify( {
          email: enterdEmail,
          password: enteredPass,
          name:enteredName
        }),
          headers:{
        'Content-Type':'application/json'
      },
    })
 
    nameInputRef.current.value=''
    emailInputRef.current.value=''
    passInputRef.current.value=''
    setIsLogin(true)
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passInputRef} />
        </div>
        {!isLogin &&    <div className={classes.control}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' required ref={nameInputRef} />
        </div>}
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading...</p>}
         
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>

        </div>
      </form>
    </section>
  );
};

export default AuthForm
