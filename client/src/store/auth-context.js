import React, { useState } from "react";

const AuthContext=React.createContext({
    token:'',
    admin:false,
    isLoggedIn: false,
    login:()=>{},
    logout: ()=>{}
})

export const AuthContextProvider = (props) =>{
    const [userLoggedIn,setUserLoggedIn]=useState(false)
    const [admin,setAdmin]=useState(false)
    const [token, setToken]= useState('')

    //let userLoggedIn=false
    const loginHandler = (token,admin) =>{
        setUserLoggedIn(true)
        setToken(token)
        setAdmin(admin)
        console.log("from Context",admin)
    }
    const logoutHandler = () =>{
        setUserLoggedIn(false)

        }

    const contextValue={
        token:token,
        admin:admin,
        isLoggedIn: userLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}


export default AuthContext