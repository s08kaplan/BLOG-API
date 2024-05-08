import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { registerSchema } from "../Helpers/formValidation";
import useAuthCalls from "../Custom-hooks/useAuthCalls";
import { useDispatch } from "react-redux";

const Register = () => {
    const { registerUser } = useAuthCalls()
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
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit =  (data) => {
    console.log("submit data",data);
    dispatch(registerUser(data))
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

              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                {...register("firstName")}
              />

              <p className="error">{errors.firstName?.message}</p>

              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                {...register("lastName")}
              />

              <p className="error">{errors.lastName?.message}</p>

            
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

              
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                {...register("image")}
              />

              <p className="error">{errors.image?.message}</p>

              <label htmlFor="biography">Biography</label>
              <textarea
                id="biography"
                name="biography"
                rows="4"
                cols="50"
                {...register("biography")}
              />

              <p className="error">{errors.image?.message}</p>

              <button disabled={isSubmitting}>Submit</button>
            </form>
            <DevTool control={control} />
          </div>
        </section>
      </main>
    </section>
  );
};

export default Register