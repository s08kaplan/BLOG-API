import React, { useState } from "react";
import logo from "../../assets/logo-2.png";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import SideBar from "../SIDEBAR/SideBar";
import { useSelector } from "react-redux";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import NavbarStyle from "./Navbar.module.scss"

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { logout, login } = useAuthCalls();
  const [sidebar, setSidebar] = useState(false);
  console.log(sidebar);

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebar(false)
  }

  return (
    <header>
      <nav>
        <section className={NavbarStyle.logo}>
        <Link to="/"><img src={logo} alt="logo" width="150px"  /></Link>  
          <span>Illuminate Your Thoughts</span>
        </section>
        <section>
          <main className={NavbarStyle.links}>
            <Link to="/blogs">
              Blogs
            </Link>
            <Link to="/categories">
              Categories
            </Link>
            <Link to="/about">
              About
            </Link>
            <Link to="/contact">
              Contact
            </Link>
            {/* <Link to=""></Link> */}
          </main>
        </section>
        <section className={NavbarStyle.avatar}>
          {/* <div onClick={() => setSidebar((prev) => !prev)}> */}
          <div onClick={toggleSidebar}>
            <Avatar size="50" src={ user?.image[0] || "https://cdn.pixabay.com/photo/2017/01/10/03/54/avatar-1968236_640.png" } round=".8rem" />
          </div>
        </section>
      </nav>
      {sidebar && (
            <div className={NavbarStyle.sidebar}>
              <SideBar isActive = {sidebar} onClose = {closeSidebar} />
            </div>
          )}
    </header>
  );
};

export default Navbar;
