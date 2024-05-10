import { useContext, useState, useEffect } from "react";
import { AppContext } from "./../../context/AppContext";
import FormCollectPoint from "./../../components/FormCollectPoint";

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
      <FormCollectPoint/> 
    </div>
  );
}

export default RegisterCollectPoint;
