import React from "react";
import style from "./Home.module.scss"
import BlogCard from "../../Components/BLOG-CARD/BlogCard";

const Home = () => {
 
  return (
    <main className={style["home-main"]}>
      <BlogCard/>
    </main>
  );
};

export default Home;
