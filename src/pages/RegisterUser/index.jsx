import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import FormUser from './../../components/FormUser'

import styles from "./index.module.css";

function RegisterUser() {
  const {
    users,
    newUser,
    blankUser,
    nameExists,
    logInUser,
    setNewUser,
    registerUser,
    updateUser,
    deleteUser,
    getusers,
    getuserById,
    viewRegister,
    setViewRegister,
    viewLogIn,
    setViewLogIn,

    handleClickUser,
  } = useContext(AppContext);

 

  return (
    <div className={styles.main}>
    <h1 className={(!viewLogIn)&&(!viewRegister)?"":styles.omitted}>Welcome to Recycle Spot!</h1>
      <img className={
        // (!viewLogIn)&&
      (!viewRegister)?"":styles.omitted} width={150} height={150} src="/logo.png" alt=""  />

       <div className={styles.content}>
      <button
        className={viewRegister || viewLogIn ? styles.omitted : ""}
        onClick={handleClickUser(viewRegister, setViewRegister)}
      >
        Register User
      </button>

      <button
        className={viewRegister || viewLogIn ? styles.omitted : ""}
        onClick={handleClickUser(viewLogIn, setViewLogIn)}
      >
        Log in
      </button>

      <div
        className={`${styles.registerBox} ${
          !viewLogIn ? styles.omitted : ""
        }`}
      >
        <h1>Log in</h1>

        <input
          type="email"
          value={newUser.email}
          placeholder="Enter user email"
          onChange={(event) =>
            setNewUser({ ...newUser, email: event.target.value })
          }
        />
        <input
          type="password"
          value={newUser.password}
          placeholder="Enter user password"
          onChange={(event) =>
            setNewUser({ ...newUser, password: event.target.value })
          }
        />
        <button
          onClick={() => {
            logInUser(newUser);
            setNewUser(blankUser);
          }}
        >
          Log in
        </button>
        <button onClick={handleClickUser(viewLogIn, setViewLogIn)}>
          Go back
        </button>
      </div>

{/* -----------------------now the register----------------------------------------- */}
      <div
        className={`${styles.registerBox} ${
          !viewRegister ? styles.omitted : ""
        }`}
      >
        {/* <h1>Register User</h1>
   

        <input
          type="text"
          value={newUser.name}
          placeholder="Enter user name"
          onChange={(event) =>
            setNewUser({ ...newUser, name: event.target.value })
          }
        />
        <input
          type="email"
          value={newUser.email}
          placeholder="Enter user email"
          onChange={(event) =>
            setNewUser({ ...newUser, email: event.target.value })
          }
        />
        <input
          type="password"
          value={newUser.password}
          placeholder="Enter user password"
          onChange={(event) =>
            setNewUser({ ...newUser, password: event.target.value })
          }
        />
        <button
          onClick={() => {
            registerUser(newUser);
            setNewUser(blankUser);
          }}
        >
          Save
        </button>
        <button onClick={handleClickUser(viewRegister, setViewRegister)}>
          Go back
        </button> */}

        

 <FormUser />

      </div>

    

      
    </div>
    </div>
   


  );
}

export default RegisterUser;

     {/* {!!users &&
        users.map((user) => (
          <>
            <h3 key={user.id}>{user.name}</h3>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <button onClick={() => {(getuserById(user.id))
        
            }}>Edit</button>
          </>
        ))} */}
