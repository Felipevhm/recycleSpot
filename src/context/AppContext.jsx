import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const blankUser = {
    name: "",
    email: "",
    password: "",
  };
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(blankUser);
  const [loginStatus, setLoginStatus] = useState({ status: false, userId: "" });
  const [clickedOnEdit, setClickedOnEdit] = useState({isEdit: false,editId: ""});
  
  useEffect(() => {
    getusers();
  }, []);

  useEffect(() => {
    console.log(loginStatus);
  }, [loginStatus]);

  function nameExists(arrayOfObjects, name) {
    const foundElement = arrayOfObjects.find((user) => user.name === name);
    if (foundElement) {
      return { result: true, foundElement: foundElement };
    } else {
      return { result: false, foundElement: null };
    }
  }

  function getusers() {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  function getuserById(id) {
    fetch("http://localhost:3000/users/" + id)
      .then((response) => response.json())
      .then((data) => {
        setUsers([data]);
        setNewUser(data);
      })
      .catch((error) => console.log(error));
  }

  function registerUser(user) {
    const searchResult = nameExists(users, user.name);

    if (user.name == "") {
      alert("User field needs a name!");
    }
    if (searchResult.result) {
      alert("Name already in use and will be updated!");
      updateUser(user, searchResult.foundElement.id);
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

  function logInUser(name, password) {
    const foundUser = nameExists(users, name);

    if (foundUser.result) {
      alert("Log in: User identified.");
      if (foundUser.foundElement.password === password) {
        alert("Correct password!");
        setLoginStatus({ status: true, userId: foundUser.foundElement.id });
      } else {
        alert("Incorrect Password!");
      }
    } else {
      alert(
        "Log in: User not registered, please try again after registration."
      );
    }
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

// Collect Point Functions and variables: --------------------------------
const blankCollectPoint = {
  name: "",
  email: "",
  password: "",
};
const [collectPoints, setCollectPoints] = useState([]);
const [newCollectPoint, setNewCollectPoint] = useState(blankCollectPoint);

useEffect(() => {
  getCollectPoints();
}, []);


function getCollectPoints() {
  fetch("http://localhost:3000/collect-points")
    .then((response) => response.json())
    .then((data) => setCollectPoints(data))
    .catch((error) => console.log(error));
}

function getCollectPointById(id) {
  fetch("http://localhost:3000/collect-points/" + id)
    .then((response) => response.json())
    .then((data) => {
      setCollectPoints([data]);
      setNewCollectPoint(data);
    })
    .catch((error) => console.log(error));
}

function registerCollectPoint(collectPoint) {
  const searchResult = nameExists(collectPoints, collectPoint.name);

  if (collectPoint.name == "") {
    alert("Collect point field needs a name!");
  }
  if (searchResult.result) {
    alert("Name already in use and will be updated!");
   
    updateCollectPoint(collectPoint, searchResult.foundElement.id);
  } else {
    alert("Name not yet used!");
    
  
    if(clickedOnEdit.isEdit){
      deleteCollectPoint(clickedOnEdit.editId)
      setClickedOnEdit({ isEdit:false,editId:""})
    }

    setCollectPoints([...collectPoints, collectPoint]);
    fetch("http://localhost:3000/collect-points", {
      method: "POST",
      body: JSON.stringify(collectPoint),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        window.alert("Collect point registered successfully!");
        getCollectPoints();
      })
      .catch((error) => window.alert("Collect point not registered!", error));
  }
}

function deleteCollectPoint(id) {
  fetch("http://localhost:3000/collect-points/" + id, {
    method: "DELETE",
  })
    .then(() => {
      window.alert("Collect point deleted successfully!");
      setNewCollectPoint(blankCollectPoint);
      getCollectPoints();
    })
    .catch((error) => window.alert("Collect point not deleted!", error));
}

function updateCollectPoint(collectPoint, id) {
  if (collectPoint.name == "") {
    alert("Collect point field needs a name!");
  }
  fetch("http://localhost:3000/collect-points/" + id, {
    method: "PUT",
    body: JSON.stringify(collectPoint),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      window.alert("Collect point updated successfully!");
      getCollectPoints();
    })
    .catch((error) => window.alert("Collect point not registered!", error));
}



  return (
    <>
      <AppContext.Provider
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
          // Collect point  
          collectPoints,
          newCollectPoint,
          blankCollectPoint,
          setNewCollectPoint,
          registerCollectPoint,
          deleteCollectPoint,
          updateCollectPoint,
          getCollectPoints,
          getCollectPointById,

          clickedOnEdit, 
          setClickedOnEdit,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};
