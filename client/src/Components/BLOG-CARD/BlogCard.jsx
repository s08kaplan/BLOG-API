import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import style from "./BlogCard.module.scss"
import { Link, useNavigate } from "react-router-dom";
import BlogPost from "../BLOG-POST/BlogPost";
import { LiaHeart } from "react-icons/lia";
import { BsEye } from "react-icons/bs";



const BlogCard = ({detail}) => {
  const { getData } = useBlogData();
  const { blogs } = useSelector((state) => state.blog);
 
  const navigate = useNavigate()

  useEffect(() => {
    getData();
  }, []);

  return (
    <section  className={style.container}>
{  detail ? detail?.map((item) => (
          <div className={style["detail-container"]} key={item._id} onClick={() =>navigate(`/blog-details/${item?._id}`)}>
            <h3>{item.title}</h3>
            <p>{item.content == "" ? "Not a blog found be the first " : <BlogPost content={ item.content }/>}</p>
            <div>
                <img src={item.image} alt={item.title} />
            </div>
            <div>
              <span>Author {item.userId?.username}</span>
              <span><LiaHeart/> {item.totalLikes}</span>
              <span><BsEye />{item.countOfViews?.length}</span>
            </div>
          </div>
        ))
        :

    blogs?.map((blog) => (
      <section key={blog?._id} className={style["blog-card"]}>
        <h4>{blog?.title}</h4>
       <Link to={`/blog-details/${blog._id}`}><img src={ blog?.image[0]} alt={blog?.title} /></Link> 
      </section>
    ))
    
    }
  </section>
  )
}

export default BlogCard