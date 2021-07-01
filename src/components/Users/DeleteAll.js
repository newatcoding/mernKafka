import React from 'react'
import Button from '../UI/Button';
import classes from './DeleteAll.module.css';
import {toast } from 'react-toastify';

const DeleteAll =(props)  =>{

    const deleteUsersHandler= async()=>{
        props.setEmpty([]);
       
        //'https://payment-n-notification-default-rtdb.firebaseio.com/Users.json'
        const response= await fetch( 'http://localhost:4000/users/deleteAllUsers',{method:'DELETE'}); 
        const resUser=await response.json();
        toast(resUser.msg,{autoClose:1200});
        //'https://payment-n-notification-default-rtdb.firebaseio.com/Notifications.json'
        const response2= await fetch( 'http://localhost:4000/notifications/deleteAllNotifications',{method:'DELETE'}); 
        const resNotify=await response2.json();
        toast(resNotify.msg,{autoClose:1200});
        // console.log(response);
        
    }
    return (
        <div className={classes.deleteEveryone}>
            <Button onClick={deleteUsersHandler}>Delete All</Button>
        </div>
    )
}

export default DeleteAll;
