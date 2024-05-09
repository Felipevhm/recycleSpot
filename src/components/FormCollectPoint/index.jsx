import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function FormCollectPoint() {
  const {
    users,
    newCollectPoint,
    blankCollectPoint,
    nameExists,
    logInCollectPoint,
    setNewCollectPoint,
    registerCollectPoint,
    updateCollectPoint,
    deleteCollectPoint,
    getCollectPoints,
    getuserById,
    viewRegister,
    setViewRegister,
    viewLogIn,
    setViewLogIn,
  } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      placeName: "",
      placeDescription: "",
      creator: "",
      latitude: "",
      longitude: "",
      wasteTypes: "",
      cep: "",
      street: "",
      number: "",
      addressLine2: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const handleCreateCollectPoint = async (data) => {
    registerCollectPoint(data);
    reset();
    //console.log(data);
  };

  const findCep = () => {
    let cep = getValues("cep");

    if (!!cep && cep.length == 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((dados) => {
          setValue("neighborhood", dados.bairro);
          setValue("street", dados.logradouro);
          setValue("state", dados.uf);
          setValue("city", dados.localidade);
        })
        .catch((error) => console.log(error));
    }
  };
  // Assuming you have an array of user names
  // const registeredUsers = [users[0].name, "User2", "User3", "User4", "User5"];

  // Assuming you have an array of waste types
  const wasteTypes = [
    "Glass",
    "Metal",
    "Paper",
    "Plastic",
    "Organic",
    "Batteries",
  ];

  return (
    <div className={styles.main}>
    <div className={styles.h1Wrapper}>
      <h1> Register Collect Point</h1>
      </div>
      <form  onSubmit={handleSubmit(handleCreateCollectPoint)} style={{padding:'10px'}}>
        <div className={styles.userInteraction}>
        
          <div className={styles.inputsDiv}>
            <div className={styles.placeInfo}>
              <input
                type="text"
                name="placeName"
                placeholder="Place Name"
                {...register("placeName", {
                  required: "Place Name field is required",
                })}
              />

              <textarea
                rows="4"
                cols="50"
                name="placeDescription"
                placeholder="Place Description"
                {...register("placeDescription", {
                  required: "Place Description field is required",
                })}
              />

              <select
                name="creator"
                {...register("creator", {
                  required: "Creator field is required",
                })}
              >
                <option value="">Select creator</option>
                {users.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="latitude"
                placeholder="Latitude"
                {...register("latitude", {
                  required: "Latitude field is required",
                })}
              />
              <input
                type="text"
                name="longitude"
                placeholder="Longitude"
                {...register("longitude", {
                  required: "Longitude field is required",
                })}
              />

  

             <div className={styles.addressGroup}>
              <input
                type="text"
                name="cep"
                {...register("cep", {
                  required: "CEP field is required",
                  onBlur: () => findCep(),
                })}
                placeholder="CEP"
              />

              <input
                type="text"
                name="street"
                placeholder="Street Name"
                {...register("street")}
              />
              <input
                type="text"
                name="number"
                placeholder="Number"
                {...register("number", {
                  required: "Number field is required",
                })}
              />
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                {...register("addressLine2")}
              />
              <input
                type="text"
                name="neighborhood"
                placeholder="Neighborhood"
                {...register("neighborhood")}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                {...register("city")}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                {...register("state")}
              />
            </div>
    

            </div> 
             <div className={styles.checkBoxField} >
              <h2>Waste Types</h2>
              {wasteTypes.map((type, index) => (
                <div key={index} className={styles.checkBoxWrapper}>
                  <input
                    type="checkbox"
                    id={type}
                    value={type}
                    {...register("wasteTypes")}
                  />
                  <label htmlFor={type}>{type}</label>
                </div>
              ))}
            </div>
            <button style={{ height: "50px", width: "100px" }} type="submit">
            Register Point
          </button>
            {/* -------------------------------------- */}
           
           
          </div>
         
        </div>
        <div className={styles.errorsDiv}>
          {errors.placeName && <p>{errors.placeName.message}</p>}
          {errors.placeDescription && <p>{errors.placeDescription.message}</p>}
          {errors.creator && <p>{errors.creator.message}</p>}
          {errors.latitude && <p>{errors.latitude.message}</p>}
          {errors.longitude && <p>{errors.longitude.message}</p>}

          {errors.cep && <p>{errors.cep.message}</p>}
          {errors.number && <p>{errors.number.message}</p>}

          {errors.wasteTypes && <p>{errors.wasteTypes.message}</p>}
        </div>
      </form>
    </div>
  );
}

export default FormCollectPoint;
