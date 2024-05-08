import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Blogs", to: "/blogs" },
  { name: "NewBlog", to: "/new-blog" },
  { name: "About", to: "/about" },
  { name: "Login", to: "/login" },
  { name: "Register", to: "/register" },
];

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section>
      <main>
        <section>
          <XMarkIcon width="20px" />
        </section>
        <section>
          {navigation.map((item) => (
            <div key={item.name}>
              <Link to={item.to}>{item.name}</Link>
              <Link to={!user && "/login"}>{!user && "Log in"}</Link>
            </div>
          ))}
        </section>
      </main>
    </section>
  );
};

export default SideBar;
