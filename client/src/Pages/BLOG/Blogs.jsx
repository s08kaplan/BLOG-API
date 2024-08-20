import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import BlogCard from "../../Components/BLOG-CARD/BlogCard";
import style from "./Blog.module.scss";

const Blogs = () => {
  // const { getAllBlogData, getData } = useBlogData();
  // const { blogs } = useSelector((state) => state.blog);

  // useEffect(() => {
  //   // getAllBlogData();
  //   // getData();
  // }, []);

  // console.log(blogs);

 
  return (
    <section className={style.main}>
      <main className={style["main-section"]}>
        <BlogCard />
      </main>
    </section>
  );
};

export default Blogs;
