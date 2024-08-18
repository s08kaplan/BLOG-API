import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
    const { errorMessage, error } = useSelector((state) => state.auth);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const location = useLocation()

    console.log(location.pathname);

    const path = location?.pathname.split("/")[1]

    useEffect(() => {
        let timer;
    
        switch (error) {
          case errorMessage.includes("duplicate") &&
            errorMessage.includes("username"):
            setMessage("Username has taken");
            timer = setTimeout(() => {
              dispatch(clearError());
            }, 5000);
    
            return () => clearTimeout(timer);
           
    
          case errorMessage.includes("duplicate") && errorMessage.includes("email"):
            setMessage("Email has taken");
            timer = setTimeout(() => {
              dispatch(clearError());
            }, 2000);
    
            return () => clearTimeout(timer);

          case errorMessage.includes("duplicate") &&
            errorMessage.includes("password"):
            setMessage("Password has taken");
            timer = setTimeout(() => {
              dispatch(clearError());
            }, 2000);
    
            return () => clearTimeout(timer);
    
          default:
            setMessage("please change username, email and password");
            timer = setTimeout(() => {
              dispatch(clearError());
            }, 2000);
    
            return () => clearTimeout(timer);
        }
      }, [error]);
    
  return (
    <section>
        <div>
             <h3>{message}</h3> 
             <h5> 
              You will be navigated to {path} page automatically in 2 seconds
            </h5>
        </div>
    </section>
  )
}

export default ErrorPage