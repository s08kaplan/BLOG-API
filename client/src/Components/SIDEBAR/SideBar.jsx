import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideStyle from "./SideBar.module.scss"
import useAuthCalls from "../../Custom-hooks/useAuthCalls";

const navigation = [
  { name: "Blogs", to: "/blogs" },
  { name: "Profile", to: "/my-profile" },
  { name: "New Blog", to: "/new-blog" },
  { name: "About", to: "/about" },
  { name: "Login", to: "/login" },
  { name: "Register", to: "/register" },
];

const SideBar = () => {
  const { token } = useSelector((state) => state.auth);
 const { logout } = useAuthCalls()
 const navigate = useNavigate()
 const dispatch = useDispatch()
  // console.log(token);
  return (
    <section className={SideStyle.container}>
      <main>
        {/* <section className={SideStyle.icon}>
          <XMarkIcon width="20px" />
        </section> */}
        <section className={SideStyle.navigation}>
          {navigation.map((item) => (
          //   <div key={item.name}>
          //  { token && item.name == "Login" || item.name == "Register" ? <Link>Log out{() => dispatch(logout())} </Link> : <Link to={ item.to }>{ item.name }</Link> }   
          //   </div>
            <div key={item.name}>
            <Link to={ item.to }>{ item.name}</Link> 
          </div>
          ))}
        </section>
      </main>
    </section>
  );
};

export default SideBar;
