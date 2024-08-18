import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import BlogCard from "../../Components/BLOG-CARD/BlogCard";
import blogStyle from "./Blog.module.scss";

const Blogs = () => {
  const { getAllBlogData, getData } = useBlogData();
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    // getAllBlogData();
    getData();
  }, []);

  console.log(blogs);

 
  return (
    <main className={blogStyle.main}>
      <section className={blogStyle["main-section"]}>
        <BlogCard />
      </section>
    </main>
  );
};

export default Blogs;
