import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BlogPost from "../BLOG-POST/BlogPost";
import { LiaHeart } from "react-icons/lia";
import { BsEye } from "react-icons/bs";
import Pagination from "../PAGINATION/Pagination";
import style from "./BlogCard.module.scss";
import ErrorPage from "../ERROR-PAGE/ErrorPage";

const BlogCard = ({ detail }) => {
  const { getData } = useBlogData();
  const { blogs, details, error, blogErrorMessage } = useSelector(
    (state) => state.blog
  );

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  

  // console.log(details);
  // console.log(details?.pages?.current_page);
  // console.log("pages state: ", pages);

  // console.log(detail);

  return (
    <section className={style.main}>
      <main className={style.container}>
        {error ? (
          <ErrorPage msg={blogErrorMessage} blogError={error} />
        ) : detail ? (
          detail?.map((item) => (
            <div
              className={style["detail-container"]}
              key={item._id}
              onClick={() => navigate(`/blog-details/${item?._id}`)}
            >
              <h3 data-test="blogTitle">{item.title}</h3>
              <section>
                {item.content == "" ? (
                  "Not a blog found be the first "
                ) : (
                  <BlogPost content={item.content} />
                )}
              </section>
              <div>
                <img src={item.image} alt={item.title} data-test="blogImage" />
              </div>
              <section className={style["author-like-info"]}>
                <span>{item.userId?.username}</span>
                <span>
                  <LiaHeart /> {item.totalLikes}
                </span>
                <span>
                  <BsEye />
                  {item.countOfViews?.length}
                </span>
              </section>
            </div>
          ))
        ) : (
          blogs?.map((blog) => (
            <section key={blog?._id} className={style["blog-card"]}>
              <Link to={`/blog-details/${blog._id}`}>
                <h4 data-test="blogTitle">{blog?.title}</h4>
                <img
                  src={blog?.image[0]}
                  alt={blog?.title}
                  data-test="blogImage"
                />
              </Link>
            </section>
          ))
        )}
      </main>
      <section className={style["pages-main"]}>
        <Pagination page={details} getData={getData} />
      </section>
    </section>
  );
};

export default BlogCard;
