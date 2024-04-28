import { useContext, useEffect} from "react";
import { UsersContext } from "./../context/UsersContext";

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


 

  return (
    <>
      <h1>Cadastro de Usuário</h1>
      {!!users &&
        users.map((user) => (
          <>
            <h3 key={user.id}>{user.name}</h3>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <button onClick={() => {(getuserById(user.id))
        
            }}>Edit</button>
          </>
        ))}
  

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

      {/* <button
        onClick={() => {
          updateUser(newUser,newUser.id);
          getusers();
        }}
      >
        Update
      </button> */}



    </>
  );
}

export default RegisterUser;