import React from "react";
import { useSelector } from "react-redux";
import { LiaHeart } from "react-icons/lia";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import style from "./CategoryDetail.module.scss"
import BlogPost from "../../Components/BLOG-POST/BlogPost";

const CategoryDetail = () => {
  const { categoryDetail, blogs } = useSelector((state) => state.blog);
  const navigate = useNavigate()
  console.log(categoryDetail);
  console.log(blogs);

  const detail = blogs?.filter(
    (blog) => blog?.categoryId?._id.toString() == categoryDetail?._id.toString()
  );
  // console.log(detail);
  if(!blogs.filter){
    return <h2 style={{position: "absolute", top:"50", left: "50", transform: "translate(-50%, -50%)"}}>Just a second please</h2>
  }
  return (
    <div className={style.main}>
      <div className={style.container}>
        {detail?.map((item) => (
          <div className={style["detail-container"]} key={item._id} onClick={() =>navigate(`/blog-details/${item?._id}`)}>
            <h3>{item.title}</h3>
            <p>{item.content == "" ? "Not a blog found be the first " : <BlogPost content={ item.content }/>}</p>
            <div>
              <span>Author {item.userId?.username}</span>
              <span><LiaHeart/> {item.totalLikes}</span>
              <span><BsEye />{item.countOfViews?.length}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;
