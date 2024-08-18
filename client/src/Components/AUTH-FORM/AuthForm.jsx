import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import { loginSchema, registerSchema } from "../../Helpers/formValidation";
import style from "./AuthStyle.module.scss";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const schemaMap = {
    loginSchema,
    registerSchema,
  };

const formRegisterInputs = [
  {
    label: "Username",
    name: "username",
    type: "text",
    "data-test": "registerUsername",
  },
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    "data-test": "registerFirstName",
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    "data-test": "registerLastName",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    "data-test": "registerEmail",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    "data-test": "registerPassword",
  },
  { label: "Image", name: "image", type: "text", "data-test": "registerImage" },
];

const formLoginInputs = [
  {
    label: "Username",
    name: "username",
    type: "text",
    "data-test": "loginUsername",
  },
  { label: "Email", name: "email", type: "email", "data-test": "loginEmail" },
  {
    label: "Password",
    name: "password",
    type: "password",
    "data-test": "loginPassword",
  },
];

const AuthForm = ({ formType, schema }) => {
  const { registerUser, login } = useAuthCalls();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [biography, setBiography] = useState();

  const resolvedSchema = schemaMap[schema];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(resolvedSchema) });

  const onSubmit = (data) => {
    // console.log("submit data", data);
    formType == "register"
      ? dispatch(registerUser(data))
      : dispatch(login(data));
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <section className={style["auth-main"]}>
      <main className={style["form-container"]}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {formType == "register"
          
            ? formRegisterInputs.map((item) => (
                <>
                  <section key={item.name} className={style["input-group"]}>
                  <input
                    data-test={item["data-test"]}
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    placeholder=" "
                    {...register(item.name)}
                  />
                  <label htmlFor={item.name} className={style["user-label"]}>
                    {item.label}
                  </label>
                  <p className={style.error}>{errors[item.name]?.message}</p>
                </section>
                </>
              
              ))

            : formLoginInputs.map((item) => (
                <section key={item.name} className={style["input-group"]}>
                  <input
                    data-test={item["data-test"]}
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    placeholder=" "
                    {...register(item.name)}
                  />
                  <label htmlFor={item.name} className={style["user-label"]}>
                    {item.label}
                  </label>
                  <p className={style.error}>{errors[item.name]?.message}</p>
                </section>
              ))}
             <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : formType === 'register' ? 'Register' : 'Login'}
      </button>
        </form>
        <DevTool control={control} />
        {formType === "login" && (
    <section>
      <span>Don't have an account? </span>
      <button
        style={{ width: "5rem", marginLeft: "1rem" }}
        onClick={() => navigate("/register")}
        data-test="loginRegisterButton"
      >
        Register
      </button>
    </section>
  )}
      </main>
    </section>
  );
};

export default AuthForm;
