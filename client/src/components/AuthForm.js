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
  const [isError, setisError]= useState(false)
  

  const clearInput = ()=>{
    if(!isLogin){
      nameInputRef.current.value=''

    }
    passInputRef.current.value=''
    emailInputRef.current.value=''

  }

  const switchAuthModeHandler = () => {

    clearInput()
    setisError(false)
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
    if(!error && !data){
      console.log('waiting')
    }
    else if(!error && data  ){
      console.log('hello from the non error')
      authCtx.login(data.token,data.user.admin)
    
   
      history.replace({
        pathname:'/home',
        state:{detail:data.info}
      })
      
    }
    else  {
      console.log(error)
      console.log('hello from error ')
      setisError(true)
    }

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
 
    if(error){
      setisError(true)
      setIsLogin(false)
    }else{
      clearInput()
      setIsLogin(true)
    }
    
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
          <input type='password' id='password' minLength='7' required ref={passInputRef} />
        </div>
        {!isLogin &&    <div className={classes.control}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' required ref={nameInputRef} />
        </div>}
        <div className={classes.actions}>
          {!isLoading && <button  >{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading...</p>}
         
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          {isError && !isLoading && isLogin && <p>{error}</p>}
          {isError && !isLoading && !isLogin && <p>Please try another email !!</p>}

        </div>
      </form>
    </section>
  );
};

export default AuthForm
