import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useBlogData from "../../Custom-hooks/useBlogData";
import { LiaHeart } from "react-icons/lia";
import { FaTrashAlt } from "react-icons/fa";
import useAxios from "../../Custom-hooks/useAxios";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { VscEdit } from "react-icons/vsc";
import BlogModal from "../../Components/BLOG-MODAL/BlogModal";
import BlogPost from "../../Components/BLOG-POST/BlogPost";
import EditCommentModal from "../../Components/EDIT-COMMENT-MODAL/EditCommentModal";
import QuillEditor from "../../Components/QUILL/QuillEditor";
import style from "./BlogDetails.module.scss";

const BlogDetails = () => {
  const { blogDetail } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const {
    getLike,
    getDetailPage,
    postComment,
    deleteComment,
    getComment,
    updateComment,
  } = useBlogData();
  const { blogId } = useParams();
  const [likeStatus, setLikeStatus] = useState("");
  const { axiosWithToken } = useAxios();

  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [editBlogModal, setEditBlogModal] = useState(false);
  const [editComment, setEditComment] = useState(blogDetail?.comments);
  const [editCommentID, setEditCommentID] = useState(null);

  const [commentModal, setCommentModal] = useState(false);

  const navigate = useNavigate();

  // console.log(blogDetail);

  // useEffect(() => {
  //   getDetailPage("blogDetail", blogId);
  //   getLike("blogs", blogId);
  //   // getComment("blogs",blogId)
  // }, [likeStatus, editComment]);


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          getDetailPage("blogDetail", blogId),
          getLike("blogs", blogId),
  
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchAllData();
  }, [likeStatus, editComment, blogId])
  // console.log(blogId);
  const postLike = async () => {
    try {
      const data = await axiosWithToken.post(`blogs/${blogId}/postLike`);
      // console.log(data);
      setLikeStatus(data);
    } catch (error) {
      // console.log("postLike error", error);
    }
  };

  const handleComment = async () => {
    const sanitizedContent = DOMPurify.sanitize(comment, {
      USE_PROFILES: { html: true },
    });
    const content = sanitizedContent;
    const innerElement = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];
    const isEmptyContent = innerElement.some((tag) => {
      const emptyTagPattern = new RegExp(
        `<${tag}><br></${tag}>|<${tag}>\\s*</${tag}>`,
        "i"
      );
      return emptyTagPattern.test(content);
    });
    if (!isEmptyContent) {
      await postComment("comments", content, blogId);
      setComment("");
    }
  };

  const handleDelete = () => {
    const data = axiosWithToken.delete(`blogs/${blogDetail?._id}`);
    navigate("/blogs");
  };
  let visitorCount = useMemo(()=> {
    return  blogDetail?.countOfViews?.length;
  },[blogDetail])
  visitorCount = visitorCount == 0 ? 1 : visitorCount;

  const categoryId = blogDetail?.categoryId;
  // console.log("blogDetail?.comments",blogDetail?.comments);

  const handleCommentEdit = (id) => {
    setCommentModal((prev) => !prev);
    const check = blogDetail?.comments.filter((comment) => comment._id == id);

    setEditComment(check[0].content);
    setEditCommentID(id);

    //  console.log(editComment);
  };

  const handleCommentDelete = (commentId) => {
    deleteComment(commentId, blogId);
  };

  const showHideComments = () => {
    setShow((prev) => !prev)
  }

  // console.log(blogDetail);
  // console.log(blogDetail?.totalLikes);
  return (
    <section className={style.main}>
      <main className={style["detail-header"]}>
        <h2>{blogDetail?.title}</h2>

        <img src={blogDetail?.image} alt="blog-image" />
        <section className={style["likes-main"]}>
          <span>
            {new Date(blogDetail?.createdAt).toLocaleDateString("tr-TR")}
          </span>
          <div className={style.likes}>
            <LiaHeart
              onClick={postLike}
              fill={`${blogDetail?.likes?.includes(user?.id) ? "red" : ""}`}
            />
            <span>{blogDetail?.totalLikes}</span>
          </div>
          {visitorCount && (
            <div className={style.views}>
              viewed by <span>{visitorCount} </span>
              <span>{visitorCount > 1 ? "people" : "person"}</span>
            </div>
          )}
        </section>

        {(blogDetail?.userId?._id == user?.id ||
          user?.isAdmin == true ||
          user?.isStaff == true) && (
          <span className={style.modal}>
            <FaTrashAlt onClick={handleDelete} />
            <VscEdit onClick={() => setEditBlogModal(!editBlogModal)} />
          </span>
        )}
        <BlogPost content={blogDetail?.content} />
      </main>

      <button
        className={style.button}
        onClick={showHideComments}
        data-test="showHideComments"
      >
        {show ? "Hide Comments" : "Show Comments"}
      </button>

      {show && (
        <section className={style.comment}>
          {blogDetail?.comments?.filter((comment) => comment.isDeleted == false)
            .length > 0 ? (
            blogDetail?.comments
              ?.filter((comment) => comment.isDeleted == false)
              .map((comment) => (
                <div key={comment._id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "40px",
                    }}
                  >
                    <BlogPost content={comment?.content} />

                    {(user?.id == comment?.userId ||
                      user?.isAdmin ||
                      user?.isStaff) && (
                      <div>
                        <FaTrashAlt
                          onClick={() => handleCommentDelete(comment?._id)}
                          color="red"
                        />
                        <VscEdit
                          onClick={() => handleCommentEdit(comment?._id)}
                          color="green"
                        />
                      </div>
                    )}
                  </div>
                  <div style={{ border: "2px solid gray" }} />
                </div>
              ))
          ) : (
            <div>
              <h4 style={{color:"black"}}>Add first comment</h4>
            </div>
          )}
        </section>
      )}
      {show && !commentModal && (
           <QuillEditor
           value={comment}
           onChange={setComment}
         />
      )}
      {show && !commentModal && (
        <button className={style.button} onClick={handleComment}>
          Add Your Comment
        </button>
      )}
      {editBlogModal && (
        <BlogModal
          {...blogDetail}
          blogId={blogId}
          categoryId={categoryId}
          onClose={setEditBlogModal}
        />
      )}
      {commentModal && (
        <EditCommentModal
          setEditComment={setEditComment}
          editComment={editComment}
          id={editCommentID}
          onClose={setCommentModal}
          userId={user?.id}
          blogId={blogId}
          updateComment={updateComment}
        />
      )}
    </section>
  );
};

export default BlogDetails;
