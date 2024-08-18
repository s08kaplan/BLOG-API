import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import style from "./SideBar.module.scss";

const navigation = [
  { name: "Profile", to: "/my-profile" },
  { name: "Blogs", to: "/blogs" },
  { name: "New Blog", to: "/new-blog" },
  { name: "Categories", to: "/categories" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
  // { name: "Login", to: "/login" },
  // { name: "Register", to: "/register" },
];

const SideBar = ({onClose}) => {
  const { token } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(false)
  }
 
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <section className={style.container}>
      <main className={style.main}>
        <section className={style.navigation}>
          {navigation.map((item) => (
            <div key={item.name}  onClick={handleClose} className={style["link-div"]}>
              <Link to={item.to}>{item.name}</Link>
            </div>
          ))}
          {token ? (
            <div className={style.logout} onClick={handleLogout}>Log out</div>
          ) : (
            <>
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
        </section>
      </main>
    </section>
  );
};

export default SideBar;
