import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { loginSchema } from "../Helpers/formValidation";
import axios from "axios";

const Login = () => {
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

  const onSubmit = async (data) => {
   try {

    const res = await axios.post("http://127.0.0.1:8080/auth/login", data)
    console.log(res.data);
   
   } catch (error) {
    console.log(error);
   }
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