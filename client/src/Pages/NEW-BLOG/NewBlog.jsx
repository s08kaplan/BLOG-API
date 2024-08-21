import React, { useState } from "react";
import useAxios from "../../Custom-hooks/useAxios";
import BlogModal from "../../Components/BLOG-MODAL/BlogModal";
import style from "./NewBlog.module.scss";

const NewBlog = () => {
  const { axiosWithToken } = useAxios();
  const [show, setShow] = useState(false)


  const postBlog = async (url, postData) => {
    try {
      const { data } = await axiosWithToken.post(`${url}/`, postData);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <section className={style["new-blog-main"]}>
      <main className={style["form-container"]}>
        <div>
          <BlogModal postBlog={postBlog} onClose={setShow} />
        </div>
      </main>
    </section>
  );
};

export default NewBlog;
