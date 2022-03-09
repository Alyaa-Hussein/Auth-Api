import React, { useState } from "react";

const AuthContext=React.createContext({
    token:'',
    admin:false,
    isLoggedIn: false,
    login:()=>{},
    logout: ()=>{}
})

export const AuthContextProvider = (props) =>{
    const intitialToken = localStorage.getItem('token')
    const intitialRole = localStorage.getItem('admin')

    const [admin,setAdmin]=useState(intitialRole)
    const [token, setToken]= useState(intitialToken)

    const userLoggedIn = !!token
    const isAdmin = !!admin
    

    const loginHandler = (token,admin) =>{
       // setUserLoggedIn(true)
       if(admin)
       {
        localStorage.setItem('admin','admin')
        setAdmin('admin')

       }
       else{
           setAdmin(null)
       }
      //  console.log('from context',admin)

        localStorage.setItem('token',token)
        setToken(token)
       // setAdmin(admin)
        //console.log("from Context",admin)
    }
    const logoutHandler = () =>{
      //  setUserLoggedIn(false)
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
        setAdmin(false)
        setToken(null)

    }

    const contextValue={
        token:token,
        admin:isAdmin,
        isLoggedIn: userLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}


export default AuthContext