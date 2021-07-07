import React from 'react';
// import { toast } from 'react-toastify';
import Card from '../UI/Card';
import classes from './UsersList.module.css';

const UsersList = (props) => {

  // useEffect(()=>{
  //  if(props.users.length!==0){
  //     toast("Data Changed");
  //     // console.log("new User");
  //  }   
   
  // },[props.users]);
 console.log(props.user);
 console.log(props.users.length);
  return (
    <Card className={classes.users}>
      <ul className="users ul" >
        {props.users.map((user,idx) => (     
            <li key={user.id} className="users li">
              <p>{user.name} ({user.age} years old) </p>
              {/* <button className={classes.button} onClick={props.delete.bind(null,user.id)}>Delete</button> */}
            </li>
    
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
