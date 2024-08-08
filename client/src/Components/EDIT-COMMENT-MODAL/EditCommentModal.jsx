import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { modules } from "../../Helpers/quillModules";
import useAxios from "../../Custom-hooks/useAxios";
import style from "../../Pages/BLOG-DETAILS/BlogDetails.module.scss"
import useDebounce from "../../Custom-hooks/useDebounce";

const EditCommentModal = ({ editComment, setEditComment, onClose,id, blogId, userId, updateComment }) => {
  // console.log("edit comment", editComment);
// console.log(id);

const { axiosWithToken } = useAxios()
const  debouncedValue  = useDebounce(editComment)

 const handleEdit =  () => {
  // console.log(editComment);
  console.log(debouncedValue);

  // const sanitizedContent = DOMPurify.sanitize(editComment, { USE_PROFILES: { html: true } });
  const sanitizedContent = DOMPurify.sanitize(debouncedValue, { USE_PROFILES: { html: true } });
  const content = sanitizedContent
  console.log(content);
  const editCommentData = {
    content,blogId,userId
  }

  updateComment("blogDetail",id, blogId, editCommentData)

 onClose()
 }

  // console.log(editComment);
  console.log(debouncedValue);
  return (
    <main style={{marginTop:"1rem"}}>
      <div>
        <ReactQuill
          //   className={detailStyle.quill}
          theme="snow"
          value={editComment}
          onChange={setEditComment}
          modules={modules}
        />
      </div>
      <button className={style.button} onClick={handleEdit} style={{ margin:"1rem auto"}}>Submit</button>
      <button className={style.button} onClick={()=> onClose()} style={{ margin:"1rem",backgroundColor:"red"}}>Cancel</button>
    </main>
  );
};

export default EditCommentModal;
