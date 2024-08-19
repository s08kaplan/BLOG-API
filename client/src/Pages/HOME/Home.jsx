import React from "react";
import BlogCard from "../../Components/BLOG-CARD/BlogCard";
import style from "./Home.module.scss"

const Home = () => {
 
  return (
    <main className={style["home-main"]}>
      <BlogCard/>
    </main>
  );
};

export default Home;
