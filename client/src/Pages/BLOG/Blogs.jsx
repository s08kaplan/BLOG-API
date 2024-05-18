import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import blogStyle from "./Blog.module.scss";

const Blogs = () => {
  const { getAllBlogData } = useBlogData();
  const { blogs } = useSelector((state) => state.blog);
  useEffect(() => {
    getAllBlogData();
  }, []);

  console.log(blogs);
  return (
    <main>
      <section key={Date.now()}>
        {blogs?.map((blog) => (
          <main key={blog._id}>
            <h2>{blog?.title}</h2>
            <section>
              <img src={blog?.image[0]} alt="blog-image" />
            </section>
            <p className={blogStyle.content}>{blog?.content}</p>
            <span>likes{blog?.totalLikes}</span>
            <span>viewed by{Math.floor(Number(blog?.countOfViews.length)) == 0 ? 1 : Math.floor(Number(blog?.countOfViews.length)) }</span>
            <div>
              {blog?.createdAt ? new Date(blog.createdAt).toLocaleString() : ""}
            </div>
            {/* <div>{blog?.updatedAt
                ? new Date(blog.updatedAt).toLocaleString()
                : ""}</div> */}
            <Link to={`/blog-details/${blog?._id}`}>
              <button>Read more</button>
            </Link>
          </main>
        ))}
      </section>
      <Link to="/new-blog">Add New Blog</Link>
    </main>
  );
};

export default Blogs;
