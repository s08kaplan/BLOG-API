import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import { registerSchema } from "../../Helpers/formValidation";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "../../Components/ERROR-PAGE/ErrorPage";
import style from "./Register.module.scss";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../Components/AUTH-FORM/AuthForm";

const Register = () => {
  const { registerUser } = useAuthCalls();
  const {  error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [biography, setBiography] = useState();
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = (data) => {
    console.log("submit data", data);
    dispatch(registerUser(data));
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);


  return (
    <section className={style["register-main"]}>
      <main className={style["form-container"]}>
        {error ? (
         
          <ErrorPage/>
        ) : (
          // <form onSubmit={handleSubmit(onSubmit)} noValidate>
          //   <div className={style["input-group"]}>
          //     <input
          //       data-test="registerUsername"
          //       type="text"
          //       id="username"
          //       name="username"
          //       placeholder=" "
          //       {...register("username")}
          //     />
          //     <label htmlFor="username" className={style["user-label"]}>
          //       Username
          //     </label>
          //     <p className={style.error}>{errors.username?.message}</p>
          //   </div>

          //   <div className={style["input-group"]}>
          //     <input
          //       data-test="registerFirstName"
          //       type="text"
          //       id="firstName"
          //       name="firstName"
          //       placeholder=" "
          //       {...register("firstName")}
          //     />
          //     <label htmlFor="firstName" className={style["user-label"]}>
          //       First Name
          //     </label>

          //     <p className={style.error}>{errors.firstName?.message}</p>
          //   </div>

          //   <div className={style["input-group"]}>
          //     <input
          //       data-test="registerLastName"
          //       type="text"
          //       id="lastName"
          //       name="lastName"
          //       placeholder=" "
          //       {...register("lastName")}
          //     />
          //     <label htmlFor="lastName" className={style["user-label"]}>
          //       Last Name
          //     </label>

          //     <p className={style.error}>{errors.lastName?.message}</p>
          //   </div>

          //   <div className={style["input-group"]}>
          //     <input
          //       data-test="registerEmail"
          //       type="text"
          //       id="email"
          //       name="email"
          //       placeholder=" "
          //       {...register("email")}
          //     />
          //     <label htmlFor="email" className={style["user-label"]}>
          //       Email
          //     </label>

          //     <p className={style.error}>{errors.email?.message}</p>
          //   </div>

          //   <div className={style["input-group"]}>
          //     <input
          //       data-test="registerPassword"
          //       type="password"
          //       id="password"
          //       name="password"
          //       placeholder=" "
          //       {...register("password")}
          //     />
          //     <label htmlFor="password" className={style["user-label"]}>
          //       Password
          //     </label>

          //     <p className={style.error}>{errors.password?.message}</p>
          //   </div>

          //   <div className={style["input-group"]}>
          //     <input
          //       data-test="registerImage"
          //       type="text"
          //       id="image"
          //       name="image"
          //       placeholder=" "
          //       {...register("image")}
          //     />
          //     <label htmlFor="image" className={style["user-label"]}>
          //       Image
          //     </label>

          //     <p className={style.error}>{errors.image?.message}</p>
          //   </div>

          //   <div className={style["input-group"]}>
          //     <label htmlFor="biography">Biography</label>
          //     <ReactQuill
          //       data-test="registerBiography"
          //       theme="snow"
          //       value={biography}
          //       onChange={setBiography}
          //     />
          //   </div>

          //   <button disabled={isSubmitting} data-test="registerSubmit">
          //     Submit
          //   </button>
          // </form>
          <AuthForm formType={"register"} schema={"registerSchema"}/>
        )}
        <DevTool control={control} />
        <section>
              <span>Already have an account </span>
              <button
                style={{ width: "5rem", marginLeft: "1rem" }}
                onClick={() => navigate("/login")}
                data-test="loginRegisterButton"
              >
                Login
              </button>
            </section>
      </main>
    
    </section>
  );
};

export default Register;
