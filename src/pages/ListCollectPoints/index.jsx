import styles from "./styles.module.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function ListCollectPoints() {
  const {
    users,
    collectPoints, //collectPoints
    blankCollectPoint, //BlankCollectPoint
    setNewCollectPoint, // setNewCollectPoint

    deleteCollectPoint, // deleteCollectPoint
    getCollectPoints, //getCollectPoints
    getCollectPointById, // getCollectPointById

    clickedOnEdit,
    setClickedOnEdit,
    findNameById,
  } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <h1>List of Collect Points</h1>

      <div className={styles.renderedList}>
        {!!collectPoints &&
          collectPoints.map((collectPoint, idx) => (
            <div key={idx} className={styles.collectPointCard}>
              <h3 key={collectPoint.id}>{collectPoint.placeName}</h3>
              <h5>
                <b>Description:</b> {collectPoint.placeDescription}
              </h5>
              <h4>
                <b>Creator:</b> {findNameById(users, collectPoint.creator)}
              </h4>
              <h4>
                <b>Latitude:</b> {collectPoint.latitude}
              </h4>
              <h4>
                <b>Longitude:</b> {collectPoint.longitude}
              </h4>
              <h4>
                <b>Waste Types:</b> {collectPoint.wasteTypes.join(", ")}
              </h4>
              <h4>
                <b>CEP:</b> {collectPoint.cep}
              </h4>
              <h4>
                <b>Street:</b> {collectPoint.street}
              </h4>
              <h4>
                <b>Number:</b> {collectPoint.number}
              </h4>
              <h4>
                <b>Address Line 2:</b> {collectPoint.addressLine2}
              </h4>
              <h4>
                <b>Neighborhood:</b> {collectPoint.neighborhood}
              </h4>
              <h4>
                <b>City:</b> {collectPoint.city}
              </h4>
              <h4>
                <b>State:</b> {collectPoint.state}
              </h4>

              <div className={styles.buttonsDiv}>
                <button onClick={() => deleteCollectPoint(collectPoint.id)}>
                  Delete
                </button>
                <button
                  onClick={() => {
                    getCollectPointById(collectPoint.id);
                    setClickedOnEdit({ isEdit: true, editId: collectPoint.id });
                    navigate("/register-collect-point");
                  }}
                  className={` ${!clickedOnEdit.isEdit ? "" : styles.omitted}`}
                >
                  Edit
                </button>

                <div
                  className={`${styles.inputsDiv} ${
                    clickedOnEdit.isEdit ? "" : styles.omitted
                  }`}
                >
                  <button
                    style={{ height: "40px", width: "60px" }}
                    onClick={() => {
                      getCollectPoints();
                      setClickedOnEdit({ isEdit: false, editId: "" });
                      setNewCollectPoint(blankCollectPoint);
                    }}
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListCollectPoints;
