import React, { useEffect, useState } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import style from "./BlogCard.module.scss";
import { Link, useNavigate } from "react-router-dom";
import BlogPost from "../BLOG-POST/BlogPost";
import { LiaHeart } from "react-icons/lia";
import { BsEye } from "react-icons/bs";
import Pagination from "../PAGINATION/Pagination";

const BlogCard = ({ detail }) => {
  const { getData } = useBlogData();
  const { blogs, details } = useSelector((state) => state.blog);
  const [pages, setPages] = useState({
    previousPage: null,
    currentPage: 1,
    nextPage: null,
    totalPages: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (details?.pages) {
      setPages({
        previousPage: details.pages.previous_page || null,
        currentPage: details.pages.current_page,
        nextPage: details.pages.next_page || null,
        totalPages: details.pages.total_pages,
      });
    }
  }, [details]);

  console.log(details);
  // console.log(details?.pages?.current_page);
  // console.log("pages state: ", pages);

  const handlePage = (newPage) => {
    if (
      newPage !== pages.currentPage &&
      newPage > 0 &&
      newPage <= pages.totalPages
    ) {
      setPages((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
      getData("blogs", newPage);
    }
  };

  // console.log(detail);

  return (
    <section className={style.main}>
      <main className={style.container}>
        {detail
          ? detail?.map((item) => (
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
          : blogs?.map((blog) => (
              <section key={blog?._id} className={style["blog-card"]}>
                <Link to={`/blog-details/${blog._id}`}>
                <h4 data-test="blogTitle">{blog?.title}</h4>
                  <img src={blog?.image[0]} alt={blog?.title} data-test="blogImage"/>
                </Link>
              </section>
            ))}
      </main>
      <section className={style["pages-main"]}>
        {/* {!detail && (
          <div className={style["pages-container"]}>
            {pages.previousPage && (
              <div onClick={() => handlePage(pages.previousPage)}>
                {pages.previousPage}
              </div>
            )}
            <div>{pages.currentPage}</div>
            {pages.nextPage && (
              <div onClick={() => handlePage(pages.nextPage)}>
                {pages.nextPage}
              </div>
            )}
          </div>
        )} */}
      </section>
      <Pagination page={details} getData={getData}/>
    </section>
  );
};

export default BlogCard;
