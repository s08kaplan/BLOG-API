import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess } from "../Features/authSlice"
import { useNavigate } from "react-router-dom"


const useAuthCalls = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
const { axiosPublic, axiosWithToken } = useAxios()


const registerUser = async (userInfo) => {
    dispatch(fetchStart())

    try {
        const { data } = await axiosPublic.post("users/", userInfo)
        dispatch(registerSuccess(data))
        navigate("/blogs")
    } catch (error) {
        dispatch(fetchFail())
        console.log(error);
    }
}

    const login = async (userInfo) => {
        dispatch(fetchStart())
        try {
          const { data } = await axiosPublic.post("auth/login", userInfo) 
          dispatch(loginSuccess(data)) 
           navigate("/blogs")
        } catch (error) {
            dispatch(fetchFail())
          console.log(error);  
        }

    }

    const logout = async () => {
       
        try {
           await axiosWithToken.get("auth/logout") 
          dispatch(logoutSuccess()) 
           navigate("/")
        } catch (error) {
            dispatch(fetchFail())
          console.log(error);  
        }

    }


  return { registerUser, login, logout }
}

export default useAuthCalls