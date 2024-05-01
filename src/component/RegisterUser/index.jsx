import { useContext, useState, useEffect } from "react";
import { UsersContext } from "../../context/UsersContext";

import styles from "./index.module.css";

function RegisterUser() {
  const {
    users,
    newUser,
    blankUser,
    nameExists,
    setNewUser,
    registerUser,
    updateUser,
    deleteUser,
    getusers,
    getuserById,
  } = useContext(UsersContext);

  const [viewRegister, setViewRegister] = useState(false);

  const handleClick = (state, setFcn) => {
    return () => setFcn(!state);
  };

  return (
    <div className={styles.main}>
      <button
        className={viewRegister ? styles.omitted : ""}
        onClick={handleClick(viewRegister, setViewRegister)}
      >
        Register User
      </button>
      <div
        className={`${styles.registerBox} ${
          !viewRegister ? styles.omitted : ""
        }`}
      >
        <h1>Register User</h1>
        {/* {!!users &&
        users.map((user) => (
          <>
            <h3 key={user.id}>{user.name}</h3>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <button onClick={() => {(getuserById(user.id))
        
            }}>Edit</button>
          </>
        ))} */}

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
        <button
          onClick={() => {
            getusers();
            setNewUser(blankUser);
          }}
        >
          Refresh
        </button>
        <button onClick={handleClick(viewRegister, setViewRegister)}>
          Go back
        </button>
      </div>
    </div>
  );
}

export default RegisterUser;
