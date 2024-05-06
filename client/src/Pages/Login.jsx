import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { loginSchema } from "../Helpers/formValidation";
import axios from "axios";
import useAuthCalls from "../Custom-hooks/useAuthCalls";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart } from "../Features/authSlice";

const Login = () => {
    const { login } = useAuthCalls()
    const dispatch = useDispatch()
  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      touchedFields,
      dirtyFields,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitSuccessful,
    },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit =  (data) => {
    dispatch(login(data))
}


useEffect(() => {

isSubmitSuccessful  && reset()

}, [isSubmitSuccessful, reset])


  return (
    <section>
      <main>
        <section>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                {...register("username")}
              />

              <p className="error">{errors.username?.message}</p>

            
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                {...register("email")}
              />

              <p className="error">{errors.email?.message}</p>

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password")}
              />

              <p className="error">{errors.password?.message}</p>

              <button disabled={isSubmitting}>Submit</button>
            </form>
            <DevTool control={control} />
          </div>
        </section>
      </main>
    </section>
  );
};

export default Login;