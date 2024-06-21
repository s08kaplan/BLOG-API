import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { modules } from "../../Helpers/quillModules";
import useAxios from "../../Custom-hooks/useAxios";

const EditCommentModal = ({ editComment, setEditComment, onClose }) => {
  // console.log("edit comment", editComment);


const { axiosWithToken } = useAxios()
  const [edit, setEdit] = useState(editComment);

 const handleEdit = async () => {
  console.log(edit);

  const sanitizedContent = DOMPurify.sanitize(edit, { USE_PROFILES: { html: true } });
  // const content = sanitizedContent.replace(/<[^>]*>/g, "");
  const content = sanitizedContent
//  const { data } = await axiosWithToken.put(`comments/${}`)
 }

  
  return (
    <>
      <div>
        <ReactQuill
          //   className={detailStyle.quill}
          theme="snow"
          value={edit}
          onChange={setEdit}
          modules={modules}
        />
      </div>
      <button onClick={handleEdit}>Submit</button>
    </>
  );
};

export default EditCommentModal;
