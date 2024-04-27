import {createContext, useEffect, useState } from "react";

export const UsersContext = createContext()

export const UsersContextProvider = ({children})=>{
   const [users, setUsers] = useState([]);

   useEffect(() => {
      getusers()
   }, []);

   function getusers() {
       fetch("http://localhost:3000/users")
       .then((response) => response.json())
       .then((data) => setUsers(data))
       .catch((error) => console.log(error));    
   }
  
   function getuserById(id) {
      fetch("http://localhost:3000/users/"+id)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));    
  }

   function registerUser(user){
      if (user.name == ""){
         alert('User field needs a name!')
      }
      setUsers ([...users,user])
      fetch("http://localhost:3000/users",{
         method: 'POST',
         body: JSON.stringify(user),
         headers: {'Content-Type': 'application/json'}
      })
      .then(() => {
         window.alert('User registered successfully!')
         getusers()
         })
      .catch((error) => window.alert('User not registered!',error))
      
     
   }

   function deleteUser(id){
      fetch("http://localhost:3000/users/"+id,{
         method: 'DELETE',
      })
      .then(() => {
         window.alert('User deleted successfully!')
         getusers()
         })
      .catch((error) => window.alert('User not deleted!',error))
   }

   function updateUser(user,id){
      if (user.name == ""){
         alert('User field needs a name!')
      }
      fetch("http://localhost:3000/users/"+id,{
         method: 'PUT',
         body: JSON.stringify(user),
         headers: {'Content-Type': 'application/json'}
      })
      .then(() => {
         window.alert('User updated successfully!')
         getusers()
         })
      .catch((error) => window.alert('User not registered!',error))
      
     
   }
   
   return(
      <>
      <UsersContext.Provider value={{
         users,registerUser,deleteUser,updateUser,getuserById}}>
         {children}
      </UsersContext.Provider>
      </>
   )
}