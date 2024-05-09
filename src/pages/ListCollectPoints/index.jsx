import styles from "./styles.module.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function ListCollectPoints() {
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
    findNameById
  } = useContext(AppContext);

  return (
    <div className={styles.main}>
      <h1>List of Collect Points</h1>

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
              
              <div className={styles.buttonsDiv}>
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
              </button></div>
            </div>
          ))}
      </div>

      <div className={`${styles.inputsDiv} ${
        (clickedOnEdit.isEdit? "" :styles.omitted)
      }`}>
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
            setNewCollectPoint({
              ...newCollectPoint,
              email: event.target.value,
            })
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
          updateCollectPoint(newCollectPoint,clickedOnEdit.editId);
          setClickedOnEdit({ isEdit:false,editId:""})
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

      </div>
      
    </div>
  );
}

export default ListCollectPoints;
