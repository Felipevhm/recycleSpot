import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function FormCollectPoint() {
  
  const {
    users,
    collectPoints,
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

    clickedOnEdit,
    setClickedOnEdit,
    findCollectPointById
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



  if(clickedOnEdit.isEdit){
 const loadCollectPoint = findCollectPointById(collectPoints,clickedOnEdit.editId)
 console.log("loadCollectPoint IS:")
 console.log(loadCollectPoint)

    setValue("placeName",loadCollectPoint.placeName)

    setValue("placeDescription", loadCollectPoint.placeDescription);
    setValue("creator", loadCollectPoint.creator);
    setValue("latitude", loadCollectPoint.latitude);
    setValue("longitude", loadCollectPoint.longitude);
    setValue("cep", loadCollectPoint.cep);
    setValue("number", loadCollectPoint.number);
    setValue("wasteTypes", loadCollectPoint.wasteTypes);
    setValue("neighborhood", loadCollectPoint.neighborhood);
    setValue("street", loadCollectPoint.street);
    setValue("state", loadCollectPoint.state);
    setValue("city", loadCollectPoint.city);

    // setClickedOnEdit({ isEdit: false, editId:""});


    // -----------------------------------

  }


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
      <form
        onSubmit={handleSubmit(handleCreateCollectPoint)}
        style={{ padding: "10px" }}
      >
        <div className={styles.userInteraction}>
          <div className={styles.inputsDiv}>
            <div className={styles.placeInfo}>
              <input
                type="text"
                name="placeName"
                placeholder="Place Name"
                {...register("placeName", {
                  required: "Place Name field is required",
                  minLength: {
                    value: 2,
                    message: "Please enter a valid place name",
                  },
                  maxLength: {
                    value: 120,
                    message: "Place name must have less than 120 characters",
                  },
                })}
              />

              <textarea
                rows="4"
                cols="50"
                name="placeDescription"
                placeholder="Place Description"
                {...register("placeDescription", {
                  required: "Place Description field is required",
                  maxLength: {
                    value: 500,
                    message: "Description must have less then 500 characters.",
                  },
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
                  // minLength: {
                  //   value: 12,
                  //   message: "Latitude must have at least 12 characters",
                  // },
                  // maxLength: {
                  //   value: 20,
                  //   message: "Latitude must have a maximum of 20 characters",
                  // },
                })}
              />
              <input
                type="text"
                name="longitude"
                placeholder="Longitude"
                {...register("longitude", {
                  required: "Longitude field is required",
                  // minLength: {
                  //   value: 12,
                  //   message: "Longitude must have at least 12 characters",
                  // },
                  // maxLength: {
                  //   value: 20,
                  //   message: "Longitude must have a maximum of 20 characters",
                  // },
                })}
              />

              <div className={styles.addressGroup}>
                <input
                  type="text"
                  name="cep"
                  {...register("cep", {
                    required: "CEP field is required",
                    onBlur: () => findCep(),
                    minLength: {
                      value: 8,
                      message: "CEP must have 08 characters.",
                    },
                    maxLength: {
                      value: 8,
                      message: "CEP must have 08 characters.",
                    },
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
                  type="number"
                  name="number"
                  placeholder="Number"
                  {...register("number", {
                    required: "Number field is required",
                    max: {
                      value: 99999,
                      message: "Enter a valid number.",
                    },
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
            <div className={styles.checkBoxField}>
              <h2>Waste Types</h2>
              {wasteTypes.map((type, index) => (
                <div key={index} className={styles.checkBoxWrapper}>
                  <input
                    type="checkbox"
                    id={type}
                    value={type}
                    {...register("wasteTypes", {
                      required: "Please select at least one waste type",
                    })}
                  />
                  <label htmlFor={type}>{type}</label>
                </div>
              ))}
            </div>
            <div className={styles.buttonsDiv} >
            <button style={{ height: "50px", width: "100px" }} type="submit">
              Register Point
            </button>

            <button  style={{ height: "50px", width: "100px" }}
          onClick={() => {
            getCollectPoints();
            setClickedOnEdit({ isEdit: false, editId:""});
            reset();
            
          }}
        >
          Refresh
        </button>
        </div>
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
