import React from "react";
import BlogCard from "../../Components/BLOG-CARD/BlogCard";
import style from "./Blog.module.scss";

const Blogs = () => {
 
  return (
    <section className={style.main}>
      <main className={style["main-section"]}>
        <BlogCard />
      </main>
    </section>
  );
};

export default Blogs;
