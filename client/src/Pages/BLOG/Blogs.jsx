import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogPost from "../../Components/BLOG-POST/BlogPost";
import blogStyle from "./Blog.module.scss";

const Blogs = () => {
  const { getAllBlogData } = useBlogData();
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    getAllBlogData();
  }, []);

  console.log(blogs);

  // if (!blogs.map) {
  //   return <h2>Just a second please </h2>;
  // }
  return (
    <main className={blogStyle.main}>
      <section className={blogStyle["main-section"]}>
        {blogs?.map((blog) => (
          <main key={blog._id}>
            <h2 data-test="blogTitle">{blog?.title}</h2>
            <section>
              <img data-test="blogImage" src={blog?.image[0]} alt="blog-image" />
            </section>
            <BlogPost content={blog?.content} />
            <span data-test="blogLikes">likes{blog?.totalLikes}</span>
            <span data-test="blogViewCount">
              viewed by
              {blog?.countOfViews.length == 0 ? 1 : blog?.countOfViews.length}
            </span>
            <div>
              {blog?.createdAt != blog.updatedAt ? new Date(blog.updatedAt).toLocaleString() : new Date(blog.createdAt).toLocaleString() }
            </div>
            {/* <div>{blog?.updatedAt
                ? new Date(blog.updatedAt).toLocaleString()
                : ""}</div> */}
            <Link
              to={`/blog-details/${blog?._id}`}
              className={blogStyle["new-blog-link"]}
            >
              <button data-test="blogDetailButton">Read more</button>
            </Link>
          </main>
        ))}
      </section>
      <section className={blogStyle["add-blog-link"]}>
        <Link to="/new-blog" data-test="addNewBlog">Add New Blog</Link>
      </section>
    </main>
  );
};

export default Blogs;
