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
  const [clickedOnEdit, setClickedOnEdit] = useState({
    isEdit: false,
    editId: "",
  });
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCollectPoints, setTotalCollectPoints] = useState(0);

  const [viewRegister, setViewRegister] = useState(false);
  const [viewLogIn, setViewLogIn] = useState(false);

  const handleClickUser = (state, setFcn) => {
    return () => setFcn(!state);
  };

  function nameExists(arrayOfObjects, name) {
    const foundElement = arrayOfObjects.find((user) => user.name === name);
    if (foundElement) {
      return { result: true, foundElement: foundElement };
    } else {
      return { result: false, foundElement: null };
    }
  }

  function CPFExists(arrayOfObjects, cpf) {
    const foundElement = arrayOfObjects.find((user) => user.cpf === cpf);
    if (foundElement) {
      return { result: true, foundElement: foundElement };
    } else {
      return { result: false, foundElement: null };
    }
  }


  function findNameById(array, id) {
    let object = array.find(item => item.id === id);
    return object ? object.name : "--not found--";
  }
  function findCollectPointById(array, id) {
    let object = array.find(item => item.id === id);
    console.log("object IS:")
    console.log(object)
    return  object
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
   // const searchResult = nameExists(users, user.name);
    const searchResult = CPFExists(users,user.cpf)

    if (user.cpf == "") {
      alert("❌ User field needs a CPF!");
    }
    if (searchResult.result) {
      alert("✅ CPF was already registered and will be updated with the new typed data!");
      updateUser(user, searchResult.foundElement.id);
    } else {
      alert("💡 CPF not used yet!");

      setUsers([...users, user]);
      fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          window.alert("✅ User registered successfully!");
          getusers();
        })
        .catch((error) => window.alert("❌ User not registered!", error));
    }
  }

  async function logInUser(typedLogin) {
    try {
      let userExists = false;
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();

      data.map((user) => {
        if (user.email === typedLogin.email) {
          alert("Log in: ✅ - User identified.");
          userExists = true;
          if (user.password === typedLogin.password) {
            localStorage.setItem("userAuthentication", true);
            alert("Log in: Done. ✅  Welcome, " + user.name + "!");
            window.location.href = "/";
            return;
          }

          alert("❌ Incorrect Password!");
          return;
        }
      });

      if (!userExists) {
        alert(
          "Log in: ❌ - User not registered, please try again after registration."
        );
      }
    } catch {
      (e) => {
        console.log(e);
      };
    }
  }

  function quitSession() {
    localStorage.removeItem("userAuthentication");
  }

  function deleteUser(id) {
    fetch("http://localhost:3000/users/" + id, {
      method: "DELETE",
    })
      .then(() => {
        window.alert("✅ User deleted successfully!");
        setNewUser(blankUser);
        getusers();
      })
      .catch((error) => window.alert("❌ User not deleted!", error));
  }

  function updateUser(user, id) {
    if (user.name == "") {
      alert("❌ User field needs a name!");
    }
    fetch("http://localhost:3000/users/" + id, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        window.alert("✅ User updated successfully!");
        getusers();
      })
      .catch((error) => window.alert("❌ User not registered!", error));
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
    const searchResult = nameExists(collectPoints, collectPoint.placeName);

    if (collectPoint.placeName == "") {
      alert("❌ Collect point field needs a name!");
      return;
    }
    if (searchResult.result) {
      alert("✅ Name registered and will be updated!");

      updateCollectPoint(collectPoint, searchResult.foundElement.id);
    } else {
      alert("💡 Name not used yet!");

      if (clickedOnEdit.isEdit) {
        silentDeleteCollectPoint(clickedOnEdit.editId);
        setClickedOnEdit({ isEdit: false, editId: "" });
      }

      setCollectPoints([...collectPoints, collectPoint]);
      fetch("http://localhost:3000/collect-points", {
        method: "POST",
        body: JSON.stringify(collectPoint),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          window.alert("✅ Collect point registered successfully!");
          getCollectPoints();
        })
        .catch((error) =>
          window.alert("❌ Collect point not registered!", error)
        );
    }
  }

  function deleteCollectPoint(id) {
    fetch("http://localhost:3000/collect-points/" + id, {
      method: "DELETE",
    })
      .then(() => {
        window.alert("✅ Collect point deleted successfully!");
        setNewCollectPoint(blankCollectPoint);
        getCollectPoints();
      })
      .catch((error) => window.alert("❌ Collect point not deleted!", error));
  }

  function silentDeleteCollectPoint(id) {
    fetch("http://localhost:3000/collect-points/" + id, {
      method: "DELETE",
    })
      .then(() => {
        setNewCollectPoint(blankCollectPoint);
        getCollectPoints();
      })
      .catch((error) => window.alert("❌ Collect point not updated properly!", error));
  }

  function updateCollectPoint(collectPoint, id) {
    const searchResult = nameExists(collectPoints, collectPoint.name);

    if (collectPoint.name == "") {
      alert("❌ Collect point field needs a name!");
      return;
    }
    if (searchResult.result) {
      alert("✅ Name registered and will be updated!");
    } else {
      if (clickedOnEdit.isEdit) {
        alert("💡 Collect point info will be updated.");
      } else {
        alert(
          "❌ Name not registered and can't be updated. \n\n💡 Please use the register page for new entries."
        );
        return;
      }
    }

    fetch("http://localhost:3000/collect-points/" + id, {
      method: "PUT",
      body: JSON.stringify(collectPoint),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        window.alert("✅ Collect point updated successfully!");
        getCollectPoints();
        if (clickedOnEdit.isEdit) {
          setClickedOnEdit({ isEdit: false, editId: "" });
        }
      })
      .catch((error) =>
        window.alert("❌ Collect point not registered!", error)
      );
  }

  useEffect(() => {
    let sumOfUsers = users.length;
    setTotalUsers(sumOfUsers);
  }, [users]);

  useEffect(() => {
    let sumOfCollectPoints = collectPoints.length;
    setTotalCollectPoints(sumOfCollectPoints);
  }, [collectPoints]);

  useEffect(() => {
    getusers();
  }, []);

  useEffect(() => {
    console.log(loginStatus);
  }, [loginStatus]);
  return (
    <>
      <AppContext.Provider
        value={{
          users,
          newUser,
          blankUser,
          nameExists,
          logInUser,
          quitSession,
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
          totalUsers,
          totalCollectPoints,

          viewRegister,
          setViewRegister,
          viewLogIn,
          setViewLogIn,

          handleClickUser,
          findNameById,
          findCollectPointById
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};
