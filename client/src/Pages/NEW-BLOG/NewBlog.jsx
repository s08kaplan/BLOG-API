import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import useAxios from "../../Custom-hooks/useAxios";
import newBlogStyle from "./NewBlog.module.scss";
import useBlogData from "../../Custom-hooks/useBlogData";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { modules } from "../../Helpers/quillModules";
import useDebounce from "../../Custom-hooks/useDebounce";
import BlogModal from "../../Components/BLOG-MODAL/BlogModal";
import QuillEditor from "../../Components/QUILL/QuillEditor";

const NewBlog = () => {
  const { categories } = useSelector((state) => state.blog);
  const { getData } = useBlogData();
  const { axiosWithToken } = useAxios();

  const inputRefs = useRef({
    title: "",
    image: "",
    categories: "",
    isPublish: "",
  });
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const quillRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    getData("categories");
  }, []);

  const handleForm = (e) => {
    const { name, value } = e.target;
    inputRefs.current[name] = value;
  };

  const postBlog = async (url, postData) => {
    try {
      const { data } = await axiosWithToken.post(`${url}/`, postData);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedContent = DOMPurify.sanitize(quillRef.current.value, {
      USE_PROFILES: { html: true },
    });

    const postData = {
      ...inputRefs.current,
      content: sanitizedContent,
    };
    console.log(postData);
    await postBlog("blogs", postData);

    navigate("/blogs");
  };

  return (
    <section className={newBlogStyle["new-blog-main"]}>
      <main className={newBlogStyle["form-container"]}>
        <div>
          <BlogModal postBlog={postBlog} onClose={setShow} />
        </div>
      </main>
    </section>
  );
};

export default NewBlog;
