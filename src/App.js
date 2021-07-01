import React, { useState,useEffect } from 'react';
import {toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import DeleteAll from './components/Users/DeleteAll';

function App() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    toast("Fetching Old Users",{autoClose:1000});
    //https://payment-n-notification-default-rtdb.firebaseio.com/Users.json
    fetch('http://localhost:4000/users/getUsers').then((res)=>{
        // console.log(res.body);
        return res.json();
      }
      ).then((data)=>{
        let array=[];
        // console.log(JSON.stringify(data).toString());
        if(data!==null){
          for (const [key, value] of Object.entries(data)) {
            array.push(value);
          }
          setUsersList(array);
        }
        else{
          toast("No users Found",{autoClose:1500});
        }
        // data.map((oldUser)=>{
        //   console.log(oldUser);
        // })
        
      }
      
    )
   
  }, []);
  
  const addUserHandler =  async (uName, uAge) => {
    
    const userData={
      name:uName,
      age:uAge,
      id: Math.random().toString() 
    }
    try{
      //'https://payment-n-notification-default-rtdb.firebaseio.com/Users.json'
      const response = await   fetch('http://localhost:4000/users/postUsers',{
        method:'POST',
        body:JSON.stringify(userData),
        headers: { 
          'Content-Type': 'application/json'
         },
      })
      const data=await response.json();
      // toast(data.msg,{autoClose:2000});
      // console.log(data);
      // const newUser{...userData,key:data.name}
      if(response.status>=200 && response.status<400){
        setUsersList((prevUsersList) => {
          return [
            ...prevUsersList,
            { name: uName, age: uAge, id: Math.random().toString(),key:data.name },
          ];
        });
      }else{
          toast.error(data.msg,{autoClose:2000});
      }
    
    }catch(err){
      toast.error(err.message,{autoClose:2000});
    }
    
    
  };

  const deleteUserHandler=async (id)=>{
    // let data=usersList;
    // 'https://payment-n-notification-default-rtdb.firebaseio.com/Users'+`/${id}.json`
    // console.log(id);
    const response= await fetch('http://localhost:4000/users/deleteUser'+`/${id}`
    ,{
      method:'DELETE'
    })
    console.log(response);
    if(response.status>=200 && response.status<400){
        const filteredUser =  await usersList.filter((user) => user.key !== id);
        toast('User removed',{autoClose:1000});
         setUsersList(filteredUser);
    }else{

    }
   
    
 }  
  
  return (
    <div>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
      <AddUser onAddUser={addUserHandler} />
      {usersList.length!==0 && <DeleteAll setEmpty={setUsersList} length={usersList.length}/>}
      <UsersList users={usersList} delete={deleteUserHandler} />
    </div>
  );
}

export default App;
