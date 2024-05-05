import { useContext, useState, useEffect } from "react";
import { AppContext } from "./../../context/AppContext";

import styles from "./styles.module.css";

function Dashboard() {
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
    totalUsers,
    totalCollectPoints,
  } = useContext(AppContext);

  return (
    <div className={styles.main}>
      <h1>Recycle Spot Dashboard</h1>

      <img width={200} height={200} src="/logo.png" alt=""  />
      <h1>Number of users: {totalUsers}</h1>
      <h1>Number of collect points: {totalCollectPoints}</h1>
    </div>
  );
}

export default Dashboard;
