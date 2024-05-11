import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogData from "../../Custom-hooks/useBlogData";
import { LiaHeart } from "react-icons/lia";
import detailStyle from "./BlogDetails.module.scss";
import useAxios from "../../Custom-hooks/useAxios";

const BlogDetails = () => {
  const { blogs, comments } = useSelector((state) => state.blog);
  const { getData } = useBlogData();
  const { blogId } = useParams();
  const { axiosWithToken } = useAxios()
  console.log(blogs);

  useEffect(() => {
    getData();
    getData("comments");
  }, []);

  const selectedBlog = blogs.find((blog) => blog._id == blogId);

  const likeInfo = async () => {
    const data = await axiosWithToken.post(`blogs/${blogId}/postLike`)
    console.log(data);
    const result = await axiosWithToken.get(`blogs/${blogId}/getLike`)
    console.log(result);
  }

  return (
    <main>
      <section>
        <div className={detailStyle["detail-header"]}>
          <h2>{selectedBlog?.title}</h2>
          <div>
            <img src={selectedBlog?.image} alt="blog-image" />
            <div onClick={likeInfo}><LiaHeart /></div>
            
            <p>{selectedBlog?.content}</p>
          </div>
        </div>
        <div className={detailStyle.comment}>
          {selectedBlog?.comments.map((comment) => (
            <span key={comment._id}>{comment.content}</span>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogDetails;
