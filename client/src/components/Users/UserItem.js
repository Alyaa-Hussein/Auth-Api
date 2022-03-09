import classes from "./UserItem.module.css";
import useHttp from "../../Http-request/use-http";
import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

const UserItem = (props) => {
  const { sendRequest } = useHttp();
  const authCtx = useContext(AuthContext);

  const [role,setRole]=useState(props.role)

  let newRole = props.role;

  
const Roles=[]
 //console.log(props.listOfRoles)
 for(const role in props.listOfRoles){
   Roles.push({name : props.listOfRoles[role].name})
 }
 //console.log(Roles)

  function changeHandler(e) {
    newRole = e.target.value;
  }
  function saveHandler() {
    sendRequest({
      url:'/users/update',
      method: 'PATCH',
      body: JSON.stringify({ id: props.id, role: newRole }),
      headers:{
        'Content-Type':'application/json',
        'Authorization':authCtx.token
      }
    });
    setRole(newRole)
  }
  return (
    <li className={classes["user-item"]}>
      <div>
        <h2>{props.name}</h2>
        <h2>{role}</h2>
      </div>
      <div>
        <h4>Change the user role</h4>
        <select onChange={changeHandler} value={role}>
          {Roles.map((role) => (
            <option value={role.name}>{role.name}</option>
          ))}
        </select>
      </div>

      <button onClick={saveHandler}>Save changes</button>
    </li>
  );
};

export default UserItem;
