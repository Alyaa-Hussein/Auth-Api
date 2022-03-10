import UserList from "../components/Users/UserList";
import useHttp from "../Http-request/use-http";
import { useEffect, useState } from "react";


const UsersPage = () => {
  const [users,setUsers]= useState([])
  const [roles,setRoles]= useState([])

  const { sendRequest,error, isLoading } = useHttp();

  useEffect(() => {
      const getUsers= async()=>{

        sendRequest({
          url: '/users/all',
         
        }).then(data =>{
          if(data){
            const loadedUsers=[]
          for(const key in data.users){
              loadedUsers.push(data.users[key])
          }
          setUsers(loadedUsers)

          }
        });
        
      
      }

      const getRoles= async()=>{
        
        const loadedRoles = await sendRequest({
            url:'/roles',
        })
      
       // console.log(loadedRoles)
        setRoles(loadedRoles)
    }

      getUsers()
      getRoles()
    
  }, [sendRequest]);

  return(
    <div>
      {!error &&<UserList users={users} roles={roles} />}
   
      {error && <h1>You are not authorized to access this page</h1>}

    </div>
     );
};

export default UsersPage;
