import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function FormUser() {
  const {
    newUser,
    blankUser,
    nameExists,
    logInUser,
    setNewUser,
    registerUser,
    updateUser,
    deleteUser,
    getusers,
    getuserById,
    viewRegister,
    setViewRegister,
    viewLogIn,
    setViewLogIn,

    handleClickUser,
  } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleCreateUser = async (data) => {
    registerUser(data);
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
  return (
    <div className={styles.main}>
      <img width={150} height={150} src="/logo.png" alt="" />
      <h1> Register User</h1>
      <form action="" onSubmit={handleSubmit(handleCreateUser)}>
        <div className={styles.userInteraction}>
          <div className={styles.inputsDiv}>
            <div className={styles.personalInfo}>
              <input
                type="text"
                name="name"
                placeholder="name"
                {...register("name", {
                  required: "Name field is required",
                  minLength: {
                    value: 2,
                    message: "Insert a valid name ",
                  },
                  maxLength: {
                    value: 120,
                    message: "Maximum of 120 caracteres",
                  },
                })}
              />

              <input
                type="email"
                name="email"
                placeholder="email"
                {...register("email", { required: "Email field is required" })}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password field is required",
                })}
              />
              <select
                name="gender"
                {...register("gender", {
                  required: "Gender field is required",
                })}
              >
                <option value="">Select...</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>

              <input
                type="text"
                name="cpf"
                placeholder="CPF"
                {...register("cpf", {
                  required: "CPF field is required",
                  minLength: {
                    value: 11,
                    message: "CPF must have 11 characters.",
                  },
                  maxLength: {
                    value: 11,
                    message: "CPF must have 11 characters.",
                  },
                })}
              />

              <input
                type="date"
                name="birth"
                placeholder="Date of Birth"
                {...register("birth")}
              />
            </div>

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
          <button style={{ height: "50px", width: "100px" }} type="submit">
            Register user
          </button>
        </div>
        <div className={styles.errorsDiv}>
          {errors.name && <p>{errors.name.message}</p>}
          {errors.email && <p>{errors.email.message}</p>}
          {errors.password && <p>{errors.password.message}</p>}
          {errors.gender && <p>{errors.gender.message}</p>}
          {errors.cpf && <p>{errors.cpf.message}</p>}
          {errors.birth && <p>{errors.birth.message}</p>}

          {errors.cep && <p>{errors.cep.message}</p>}
          {errors.street && <p>{errors.street.message}</p>}
          {errors.number && <p>{errors.number.message}</p>}
          {errors.addressLine2 && <p>{errors.addressLine2.message}</p>}
          {errors.neighborhood && <p>{errors.neighborhood.message}</p>}
          {errors.city && <p>{errors.city.message}</p>}
          {errors.state && <p>{errors.state.message}</p>}
        </div>
      </form>
      <button
        style={{ height: "25px", width: "100px" }}
        onClick={handleClickUser(viewRegister, setViewRegister)}
      >
        Go back
      </button>
    </div>
  );
}

export default FormUser;
