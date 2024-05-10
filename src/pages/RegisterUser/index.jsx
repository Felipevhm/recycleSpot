import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import FormUser from "./../../components/FormUser";

import styles from "./index.module.css";

function RegisterUser() {
  const {
    newUser,
    blankUser,
    logInUser,
    setNewUser,

    viewRegister,
    setViewRegister,
    viewLogIn,
    setViewLogIn,

    handleClickUser,
  } = useContext(AppContext);

  return (
    <div className={styles.main}>
      <h1 className={!viewLogIn && !viewRegister ? "" : styles.omitted}>
        Welcome to Recycle Spot!
      </h1>
      <img
        className={!viewRegister ? "" : styles.omitted}
        width={150}
        height={150}
        src="/logo.png"
        alt=""
      />

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

        <div
          className={`${styles.registerBox} ${
            !viewRegister ? styles.omitted : ""
          }`}
        >
          <FormUser />
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
