import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

import styles from "./styles.module.css";

function RegisterCollectPoint() {
  const {
    users, //collectPoints
    newUser, //newCollectPoint
    blankUser, //BlankCollectPoint
    nameExists,  // ?
    logInUser, // X
    setNewUser, // setNewCollectPoint
    registerUser, //registerCollectPoint
    updateUser, // updateCollectPoint
    deleteUser, // deleteCollectPoint
    getusers, //getCollectPoints
    getuserById, // getCollectPointsById?
  } = useContext(AppContext);


  const handleClick = (state, setFcn) => {
    return () => setFcn(!state);
  };

  return (
    <div className={styles.main}>
{/* -----------------------now the register----------------------------------------- */}
      <div

      >
        <h1>Register Collect Point</h1>
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
      </div>
    </div>


  );
}

export default RegisterCollectPoint;
