import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogData from "../../Custom-hooks/useBlogData";
import detailStyle from "./BlogDetails.module.scss";

const BlogDetails = () => {
  const { blogs, comments } = useSelector((state) => state.blog);
  const { getData } = useBlogData();
  const { blogId } = useParams();
console.log(blogs);

  useEffect(() => {
    getData();
    getData("comments");
  }, []);

  const selectedBlog = blogs.find((blog) => blog._id == blogId);

  return (
    <main>
      <section>
        <div>
          <h2>{selectedBlog?.title}</h2>
          <img src={selectedBlog?.image} alt="" />
          <p>{selectedBlog?.content}</p>
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
