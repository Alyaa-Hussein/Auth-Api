import UserList from "../components/Users/UserList";
import useHttp from "../Http-request/use-http";
import AuthContext from "../store/auth-context";
import { useEffect, useContext, useState } from "react";


const UsersPage = () => {
  const [users,setUsers]= useState([])
  const [roles,setRoles]= useState([])

  const { sendRequest } = useHttp();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
      const getUsers= async()=>{

        const data = await sendRequest({
            url: '/users/all',
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':authCtx.token
            },
          });
         const loadedUsers=[]
          for(const key in data.users){
              loadedUsers.push(data.users[key])
          }
        //console.log(loadedUsers)
          setUsers(loadedUsers)
      }

      const getRoles= async()=>{
        const loadedRoles = await sendRequest({
            url:'/roles',
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':authCtx.token
            },
        })
      
       // console.log(loadedRoles)
        setRoles(loadedRoles)

    }

      getUsers()
      getRoles()
    
  }, [sendRequest, authCtx.token]);

  return <UserList users={users} roles={roles} />;
};

export default UsersPage;
