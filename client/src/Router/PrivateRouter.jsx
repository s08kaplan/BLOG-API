import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRouter = () => {
    const { username } = useSelector(state=> state.auth.user)

    return username ?  <Outlet /> : <Navigate to="/" />
      
}

export default PrivateRouter