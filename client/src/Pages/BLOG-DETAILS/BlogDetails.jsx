import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogData from "../../Custom-hooks/useBlogData";
import { LiaHeart } from "react-icons/lia";
import { FaTrashAlt } from "react-icons/fa";
import detailStyle from "./BlogDetails.module.scss";
import useAxios from "../../Custom-hooks/useAxios";

const BlogDetails = () => {
  const { blogs, comments } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [likeStatus, setLikeStatus] = useState("");
  const { getData, getLike } = useBlogData();
  const { blogId } = useParams();
  const { axiosWithToken } = useAxios();

  useEffect(() => {
    getData();
    getLike("blogs", blogId);
    // getData("comments");
  }, [likeStatus]);

  const likeInfo = async () => {
    try {
      const data = await axiosWithToken.post(`blogs/${blogId}/postLike`);
      console.log(data);
      setLikeStatus(data);
    } catch (error) {
      console.log("postLike error", error);
    }
  };

  const selectedBlog = blogs?.find((blog) => blog?._id == blogId);
  // let visitorCount = Math.trunc(Number(selectedBlog?.countOfViews) / 2);
  // visitorCount = visitorCount > 1 ? visitorCount : 1;
  return (
    <main>
      <section>
        <div className={detailStyle["detail-header"]}>
          <h2>{selectedBlog?.title}</h2>
          <div>
            <img src={selectedBlog?.image} alt="blog-image" />
            <div>
              <LiaHeart
                onClick={likeInfo}
                fill={`${selectedBlog?.likes?.includes(user?.id) ? "red" : ""}`}
              />
            </div>
            <span>{selectedBlog?.totalLikes}</span>
            <h4>
              {/* viewed by <span>{visitorCount} </span> */}
              viewed by <span>{Math.trunc(Number(selectedBlog?.countOfViews)/2)} </span>
              <span>
                {/* {visitorCount && visitorCount > 1 ? "people" : "person"} */}
                {Math.trunc(Number(selectedBlog?.countOfViews)/2) > 1 ? "people" : "person"}
              </span>
            </h4>
            {selectedBlog?.userId == user?.id && (
              <span>
                <FaTrashAlt />
              </span>
            )}
            <p>{selectedBlog?.content}</p>
          </div>
        </div>
        <div className={detailStyle.comment}>
          {selectedBlog?.comments.map((comment) => (
            <span key={comment?._id}>{comment?.content}</span>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogDetails;
