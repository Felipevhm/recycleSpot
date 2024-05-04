import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {



  

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
      updateCollectPoint(collectPoint, searchResult.foundCollectPoint.id);
    } else {
      alert("Name not yet used!");

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

        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};
