import styles from "./styles.module.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function ListCollectPoints() {
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

  return (
    <div className={styles.main}>
      <h1>List of Collect Points</h1>

      <div className={styles.renderedList}>
        {!!collectPoints &&
          collectPoints.map((collectPoint, idx) => (
            <div key={idx} className={styles.collectPointCard}>
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
