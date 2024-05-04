import { useContext, useState, useEffect } from "react";
import { AppContext } from "./../../context/AppContext";

import styles from "./styles.module.css";

function RegisterCollectPoint() {
  const {
    collectPoints, //collectPoints
    newCollectPoint, //newCollectPoint
    blankCollectPoint, //BlankCollectPoint
    setNewCollectPoint, // setNewCollectPoint
    registerCollectPoint, //registerCollectPoint

    nameExists, // ?
    updateCollectPoint, // updateCollectPoint
    deleteCollectPoint, // deleteCollectPoint
    getCollectPoints, //getCollectPoints
    getCollectPointById, // getCollectPointById

    clickedOnEdit,
    setClickedOnEdit,
  } = useContext(AppContext);

  //   const handleClick = (state, setFcn) => {
  //     return () => setFcn(!state);
  //   };

  return (
    <div className={styles.main}>
      {/* -----------------------now the register----------------------------------------- */}

      <h1>Register Collect Point</h1>
      <input
        type="text"
        value={newCollectPoint.name}
        placeholder="Enter Collect Point name"
        onChange={(event) =>
          setNewCollectPoint({ ...newCollectPoint, name: event.target.value })
        }
      />
      <input
        type="email"
        value={newCollectPoint.email}
        placeholder="Enter Collect Point email"
        onChange={(event) =>
          setNewCollectPoint({ ...newCollectPoint, email: event.target.value })
        }
      />
      <input
        type="password"
        value={newCollectPoint.password}
        placeholder="Enter Collect Point password"
        onChange={(event) =>
          setNewCollectPoint({
            ...newCollectPoint,
            password: event.target.value,
          })
        }
      />
      <button
        onClick={() => {
          registerCollectPoint(newCollectPoint);
          setNewCollectPoint(blankCollectPoint);
        }}
      >
        Save
      </button>

       <button
          onClick={() => {
            getCollectPoints();
            setClickedOnEdit({ isEdit: false, editId:""});
            setNewCollectPoint(blankCollectPoint);
          }}
        >
          Refresh
        </button>

      {!!collectPoints &&
        collectPoints.map((collectPoint, idx) => (
          <div key={idx}>
            <h3 key={collectPoint.id}>{collectPoint.name}</h3>
            <button onClick={() => deleteCollectPoint(collectPoint.id)}>
              Delete
            </button>
            <button
              onClick={() => {
                getCollectPointById(collectPoint.id);
                setClickedOnEdit({ isEdit: true, editId: collectPoint.id });
              }}
            >
              Edit
            </button>
          </div>
        ))}

    </div>
  );
}

export default RegisterCollectPoint;
