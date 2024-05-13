import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogData from "../../Custom-hooks/useBlogData";
import { LiaHeart } from "react-icons/lia";
import { FaTrashAlt } from "react-icons/fa";
import detailStyle from "./BlogDetails.module.scss";
import useAxios from "../../Custom-hooks/useAxios";

const BlogDetails = () => {
  const { blogDetail } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [likeStatus, setLikeStatus] = useState("");
  const { getLike, getDetailPage } = useBlogData();
  const { blogId } = useParams();
  const { axiosWithToken } = useAxios();

  console.log(blogDetail);
  useEffect(() => {
    getDetailPage("blogDetail",blogId);
    getLike("blogs", blogId);
  }, [likeStatus]);
// console.log(blogId);
  const postLike = async () => {
    try {
      const data = await axiosWithToken.post(`blogs/${blogId}/postLike`);
      console.log(data);
      setLikeStatus(data);
    } catch (error) {
      console.log("postLike error", error);
    }
  };

  let visitorCount = Math.trunc(Number(blogDetail?.countOfViews?.length)/2)
visitorCount = visitorCount == 0 ? 1 : visitorCount
console.log(visitorCount);
  return (
    <main>
        <section>
        <div className={detailStyle["detail-header"]}>
          <h2>{blogDetail?.title}</h2>
          <div>
            <img src={blogDetail?.image} alt="blog-image" />
            <div>
              <LiaHeart
                onClick={postLike}
                fill={`${blogDetail?.likes?.includes(user?.id) ? "red" : ""}`}
              />
            </div>
            <span>{blogDetail?.totalLikes}</span>
            <h4>
              {/* viewed by <span>{Math.trunc(Number(blogDetail?.countOfViews.length)/2)} </span> */}
              viewed by <span>{visitorCount} </span>
              <span>
                {/* {Math.trunc(Number(blogDetail?.countOfViews.length)/2) > 1 ? "people" : "person"} */}
                {visitorCount > 1 ? "people" : "person"}
              </span>
            </h4>
            {blogDetail?.userId == user?.id && (
              <span>
                <FaTrashAlt />
              </span>
            )}
            <p>{blogDetail?.content}</p>
          </div>
        </div>
        <div className={detailStyle.comment}>
          {blogDetail?.comments?.map((comment) => (
            <span key={comment?._id}>{comment?.content}</span>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogDetails;
