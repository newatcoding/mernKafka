import React, { useState,useRef } from 'react';
// import ReacDOM from 'react-dom';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';
import Wrapper from '../Helpers/Wrapper';
import { toast } from 'react-toastify';
import { useThrottle } from 'throttle-hooks';
import Queue from "queue-promise";

const AddUser = (props) => {
  const nameInputRef=useRef();
  const ageInputRef=useRef();
  // const throttle=useThrottle(1000);
  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();
  const queue=new Queue({
    concurrent:500,
    interval:0,
    start:true
  });
  const addUserHandler = async(event) => {
    event.preventDefault();
    // console.log(nameInputRef);
    const enteredName=nameInputRef.current.value;
    const enteredUserAge=ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    const notification={
      type:'success',
      message:'Successfully added new User',
      Name:nameInputRef.current.value,
      age:ageInputRef.current.value,
    }

    nameInputRef.current.value='';
    ageInputRef.current.value='';
    toast("Adding Initiated",{autoClose:2000});
    
      for(let i=0;i<1000;i++){ 
          //  queue.enqueue(async function abc(){
              addNotificationHandler(notification);
              props.onAddUser(enteredName, enteredUserAge);
          // });
          // abc();
      }

    while(queue.shouldRun){
       await queue.dequeue();
    }
    
    
    // setEnteredUsername('');
    // setEnteredAge('');
   
  };


  async function addNotificationHandler(notification){
    //'https://payment-n-notification-default-rtdb.firebaseio.com/Notifications.json'
    const response= await fetch('http://localhost:4000/notifications/postNotifications',{
      method:'POST',
      body:JSON.stringify(notification), 
      headers:{
        'Content-Type': 'application/json'
      }
    });
    // const data=await response.json();
    // console.log(data);
  }
  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
