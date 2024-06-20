import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useBlogData from "../../Custom-hooks/useBlogData";
import { LiaHeart } from "react-icons/lia";
import { FaTrashAlt } from "react-icons/fa";
import useAxios from "../../Custom-hooks/useAxios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { VscEdit } from "react-icons/vsc";
import BlogModal from "../../Components/BLOG-MODAL/BlogModal";
import detailStyle from "./BlogDetails.module.scss";
import BlogPost from "../../Components/BLOG-POST/BlogPost";

const BlogDetails = () => {
  const { blogDetail } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [likeStatus, setLikeStatus] = useState("");
  const { getLike, getDetailPage, postComment, getData} = useBlogData();
  const { blogId } = useParams();
  const { axiosWithToken } = useAxios();
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [editBlogModal, setEditBlogModal] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    getDetailPage("blogDetail", blogId);
    getLike("blogs", blogId);
  }, [likeStatus]);
  // console.log(blogId);
  const postLike = async () => {
    try {
      const data = await axiosWithToken.post(`blogs/${blogId}/postLike`);
      // console.log(data);
      setLikeStatus(data);
    } catch (error) {
      console.log("postLike error", error);
    }
  };

  const handleComment = async () => {

    const sanitizedContent = DOMPurify.sanitize(comment, { USE_PROFILES: { html: true } });
    // const content = sanitizedContent.replace(/<[^>]*>/g, "");
    const content = sanitizedContent
    await  postComment("comments",content,blogId)

  }

  const handleDelete =  () => {
    const data =  axiosWithToken.delete(`blogs/${blogDetail?._id}`)
  navigate("/blogs")
  }
  let visitorCount = blogDetail?.countOfViews?.length;
  visitorCount = visitorCount == 0 ? 1 : visitorCount;
  
  const categoryId = blogDetail?.categoryId
  console.log(blogDetail?.comments);
 
const handleCommentEdit = async (id) => {
console.log(id);
const data = await axiosWithToken.put(`comments/${id}`)
console.log(data);
}
  
const handleCommentDelete = async (id) => {
console.log(id);
const data = await axiosWithToken.delete(`comments/${id}`)
console.log(data);
}

  return (
    <main className={detailStyle.main}>
      <section>
        <div className={detailStyle["detail-header"]}>
          <h2>{blogDetail?.title}</h2>
          
            <img src={blogDetail?.image} alt="blog-image" />
            <div className={detailStyle.likes}>
              <LiaHeart
                onClick={postLike}
                fill={`${blogDetail?.likes?.includes(user?.id) ? "red" : ""}`}
              />
            <span>{blogDetail?.totalLikes}</span>
            </div>
            {
              visitorCount && (
              <div className={detailStyle.views}>
                viewed by <span>{visitorCount} </span>
                <span>
                  {visitorCount > 1 ? "people" : "person"}
                </span>
              </div>)
            }
            
            {(blogDetail?.userId?._id == user?.id || (user?.isAdmin == true || user?.isStaff == true)) && (
              <span className={detailStyle.modal}>
                <FaTrashAlt onClick={handleDelete}/>
                <VscEdit onClick={()=>setEditBlogModal(!editBlogModal)}/>
              </span>
            )}
            {/* <p className={detailStyle.content}>{blogDetail?.content}</p> */}
            <BlogPost content={blogDetail?.content} />
        </div>
        <button onClick={() => setShow((prev) => !prev)}>Show comments</button>
        {show && (
          <div className={detailStyle.comment} >
            {/* <h4>{comments?.userId.username}</h4> */}
            {blogDetail?.comments?.length > 0 ? (
              blogDetail?.comments?.map((comment) => (
                <div key={comment._id}>
                  <div>
                    <BlogPost  content={comment?.content} />
                  <FaTrashAlt onClick={()=>handleCommentDelete(comment?._id)} color="red"/>
                  <VscEdit onClick={()=>handleCommentEdit(comment?._id)} color="green"/>
                  </div>
                  <div style={{border:"2px solid red"}}/>
                </div>
              ))
            ) : (
              <div>
                <h4>Add first comment</h4>
                
                
              </div>
            )}
          </div>
        )}
        { show && 
          <ReactQuill
          className={detailStyle.quill}
                  theme="snow"
                  value={comment}
                  onChange={setComment}
                />
               
         }
         { show &&  <button onClick={handleComment}>Add Your Comment</button>}
      </section>
      {
        editBlogModal && <BlogModal {...blogDetail} blogId={blogId} categoryId={categoryId} onClose={setEditBlogModal} />
      }
      
    </main>
  );
};


export default BlogDetails;