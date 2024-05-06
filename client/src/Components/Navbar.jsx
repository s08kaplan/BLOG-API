import React from 'react'
import logo from "../assets/logo-2.png"
import { Link } from 'react-router-dom'
import Avatar from "react-avatar";
import { RxHamburgerMenu } from "react-icons/rx";
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux';
import useAuthCalls from '../Custom-hooks/useAuthCalls';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
  const { logout, login } = useAuthCalls();
  
  return (
    <header>
        <nav className='flex items-center justify-between '>
            <section className='container flex items-center justify-between gap-4'>
                    <img  src={logo} alt="logo" width="150px"/>
                <span className='text-center'>Illuminate Your Thoughts</span>
            </section>
            <section>
                <main className='flex gap-6 '>
                    <Link to="/blogs" className='no-underline'>Blogs</Link>
                    <Link to="/categories" className='no-underline'>Categories</Link>
                    <Link to="/about" className='no-underline'>About</Link>
                    <Link to="/contact" className='no-underline'>Contact</Link>
                    {/* <Link to=""></Link> */}
                </main>
            </section>
            <section>
                <Avatar size="50" src="" round=".8rem"/>
                <Link to={user ? "my-profile" : "/"}>
                <li>My Profile</li>
              </Link>
              <Link to={!user && "/login"}>
                <li onClick={() => (user ? logout() : login())}>
                  {user ? "Log out" : " Log in"}
                </li>
              </Link>
              {!user.username && (
                <Link to="/register">
                  <li>Register</li>
                </Link>
              )}
            </section>
            
            <SideBar/>
        </nav>
    </header>
  )
}

export default Navbar