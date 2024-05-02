import { createContext, useEffect, useState } from "react";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const blankUser = {
    name: "",
    email: "",
    password: "",
  };
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(blankUser);

  useEffect(() => {
    getusers();
  }, []);

  function nameExists(arrayOfObjects, name) {
   const foundUser = arrayOfObjects.find((user) => user.name === name);
   if (foundUser) {
     return {result:true, foundUser:foundUser};
   } else {
     return {result:false, foundUser:null};
   }
 }
 

  function getusers() {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  function getuserById(id) {
    console.log("id IS: ");
    console.log(id);

    fetch("http://localhost:3000/users/" + id)
      .then((response) => response.json())
      .then((data) => {
        setUsers([data]);
        setNewUser(data);
      })
      .catch((error) => console.log(error));
  }

  function registerUser(user) {
   const searchResult = nameExists(users, user.name)

    if (user.name == "") {
      alert("User field needs a name!");
    }
    if (searchResult.result) {
      alert("Name already in use and will be updated!");
      updateUser(user, searchResult.foundUser.id);
    } else {
      alert("Name not yet used!");
 
      setUsers([...users, user]);
      fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          window.alert("User registered successfully!");
          getusers();
        })
        .catch((error) => window.alert("User not registered!", error));
    }
  }

  function logInUser(name,password) {

    const foundUser = nameExists(users,name)
    // console.log("foundUser IS:")
    // console.log(foundUser)

    if(foundUser.result){
         alert("Log in: User identified.")
         if(foundUser.foundUser.password === password){
          alert("Correct password!");
          registerLogin("Login OK",foundUser.foundUser.id)
         }
         else{
          alert("Incorrect Password!");
          
         }
        }
    else{
      alert("Log in: User not registered, please try again after registration.")
    }    
   }

   function registerLogin(status,id){
    alert("status: " + status + " id: " + id) 
   }
  function deleteUser(id) {
    fetch("http://localhost:3000/users/" + id, {
      method: "DELETE",
    })
      .then(() => {
        window.alert("User deleted successfully!");
        setNewUser(blankUser);
        getusers();
      })
      .catch((error) => window.alert("User not deleted!", error));
  }

  function updateUser(user, id) {
    if (user.name == "") {
      alert("User field needs a name!");
    }
    fetch("http://localhost:3000/users/" + id, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        window.alert("User updated successfully!");
        getusers();
      })
      .catch((error) => window.alert("User not registered!", error));
  }

  return (
    <>
      <UsersContext.Provider
        value={{
          users,
          newUser,
          blankUser,
          nameExists,
          logInUser,
          setNewUser,
          registerUser,
          deleteUser,
          updateUser,
          getusers,
          getuserById,
        }}
      >
        {children}
      </UsersContext.Provider>
    </>
  );
};
