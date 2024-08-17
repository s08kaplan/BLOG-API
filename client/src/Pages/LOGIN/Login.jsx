import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { loginSchema } from "../../Helpers/formValidation";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.scss";

const Login = () => {
  const { login } = useAuthCalls();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
    },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    console.log("submit data", data);
    dispatch(login(data));
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <main>
      <section>
        <div className={style["login-form"]}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <section className={style["input-group"]}>
              <input
                data-test="loginUsername"
                type="text"
                id="username"
                name="username"
                placeholder=" "
                {...register("username")}
              />
              <label className={style["user-label"]} htmlFor="username">
                Username
              </label>

              <p className={style.error}>{errors.username?.message}</p>
            </section>

            <section className={style["input-group"]}>
              <input
                data-test="loginEmail"
                type="text"
                id="email"
                name="email"
                placeholder=" "
                {...register("email")}
              />
              <label className={style["user-label"]} htmlFor="email">
                Email
              </label>

              <p className={style.error}>{errors.email?.message}</p>
            </section>

            <section className={style["input-group"]}>
              <input
                data-test="loginPassword"
                type="password"
                id="password"
                name="password"
                placeholder=" "
                {...register("password")}
              />
              <label className={style["user-label"]} htmlFor="password">
                Password
              </label>

              <p className={style.error}>{errors.password?.message}</p>
            </section>

            <button disabled={isSubmitting} data-test="loginSubmit">Submit</button>
          </form>
          <DevTool control={control} />
        <div>
         <span>Don't have an account </span> 
          <button style={{width:"5rem", marginLeft:"1rem"}} onClick={()=> navigate("/register")} data-test="loginRegisterButton">Register</button>
        </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
