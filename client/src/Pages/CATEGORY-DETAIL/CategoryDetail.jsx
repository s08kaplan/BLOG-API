import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { LiaHeart } from "react-icons/lia";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BlogPost from "../../Components/BLOG-POST/BlogPost";
import BlogCard from "../../Components/BLOG-CARD/BlogCard";
import useBlogData from "../../Custom-hooks/useBlogData";
import style from "./CategoryDetail.module.scss"

const CategoryDetail = () => {
  const { categoryDetail, blogs } = useSelector((state) => state.blog);
  const { getData } = useBlogData();
  const navigate = useNavigate()
  console.log(categoryDetail);
  console.log(blogs);
useEffect(() => {
 !blogs && getData("blogs") 
}, [])

  const detail = blogs?.filter(
    (blog) => blog?.categoryId?._id.toString() == categoryDetail?._id.toString()
  );
  // console.log(detail);
  // if(!blogs.filter){
  //   return <h2 style={{position: "absolute", top:"50", left: "50", transform: "translate(-50%, -50%)"}}>Just a second please</h2>
  // }
  return (
    <div className={style.main}>
      <div className={style.container}>
        {/* {detail?.map((item) => (
          <div className={style["detail-container"]} key={item._id} onClick={() =>navigate(`/blog-details/${item?._id}`)}>
            <h3>{item.title}</h3>
            <div>{item.content == "" ? "Not a blog found be the first " : <BlogPost content={ item.content }/>}</div>
            <div>
              <span>Author {item.userId?.username}</span>
              <span><LiaHeart/> {item.totalLikes}</span>
              <span><BsEye />{item.countOfViews?.length}</span>
            </div>
          </div>
        ))} */}
        <BlogCard detail={detail}/>
      </div>
    </div>
  );
};

export default CategoryDetail;
