import { useContext, useState, useEffect } from "react";
import { AppContext } from "./../../context/AppContext";

import styles from "./styles.module.css";

function Dashboard() {
  const {
    users,
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
    findNameById,
  } = useContext(AppContext);




  return (
    <div className={styles.main}>
      <h1>Recycle Spot Dashboard</h1>

      <img width={200} height={200} src="/logo.png" alt=""  />
      <h1>Number of users: {totalUsers}</h1>
      <h1>Number of collect points: {totalCollectPoints}</h1>
    
      <div className={styles.renderedList}>
        {!!collectPoints &&
          collectPoints.map((collectPoint, idx) => (
            <div key={idx} className={styles.collectPointCard}>
              <h3 key={collectPoint.id}>{collectPoint.placeName}</h3>
              <h5 key={collectPoint.id}><b>Description:</b> {collectPoint.placeDescription}</h5>
              <h4><b>Creator:</b> {findNameById(users,collectPoint.creator)}</h4>
              <h4><b>Latitude:</b> {collectPoint.latitude}</h4>
              <h4><b>Longitude:</b> {collectPoint.longitude}</h4>
              <h4><b>Waste Types:</b> {collectPoint.wasteTypes.join(", ")}</h4>
              <h4><b>CEP:</b> {collectPoint.cep}</h4>
              <h4><b>Street:</b> {collectPoint.street}</h4>
              <h4><b>Number:</b> {collectPoint.number}</h4>
              <h4><b>Address Line 2:</b> {collectPoint.addressLine2}</h4>
              <h4><b>Neighborhood:</b> {collectPoint.neighborhood}</h4>
              <h4><b>City:</b> {collectPoint.city}</h4>
              <h4><b>State:</b> {collectPoint.state}</h4>
              
              {/* <div className={styles.buttonsDiv}>
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
              </div> */}
            </div>
          ))}
      </div>

    </div>
  );
}

export default Dashboard;
