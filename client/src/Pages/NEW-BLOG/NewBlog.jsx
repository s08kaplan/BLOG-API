import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import useAxios from "../../Custom-hooks/useAxios";
import newBlogStyle from "./NewBlog.module.scss"
import useBlogData from "../../Custom-hooks/useBlogData";

const NewBlog = () => {
  const { categories } = useSelector((state) => state.blog);
 const { getData } = useBlogData()
  const { axiosWithToken } = useAxios();
  const [inputs, setInputs] = useState({
    title: "",
    // content: "",
    image: "",
    categories: "",
    isPublish: "",
  });
  const [content, setContent] = useState("")  
  console.log("categories", categories);

  useEffect(() => {
 getData("categories")
  }, [])
  
  const handleForm = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
      content
    });
  };
  console.log(inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postBlog("blogs", inputs);
  };

  const postBlog = async (url, postData) => {
    try {
      const { data } = await axiosWithToken.post(`${url}/`, postData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
console.log(content);
  return (
    <section>
      <main>
        <section>
          <form onSubmit={handleSubmit}>
            <div className={newBlogStyle["input-group"]}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={inputs.title}
                onChange={handleForm}
              />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <ReactQuill className={newBlogStyle.quill} theme="snow" value={content} onChange={setContent} />
            </div>
            <div className={newBlogStyle["input-group"]}>
              <label htmlFor="image">Image Url</label>
              <input
                type="text"
                id="image"
                name="image"
                value={inputs.image}
                onChange={handleForm}
              />
            </div>
            <div className={newBlogStyle["input-group"]}>
              <select 
                name="categories"
                id="categories"
                value={inputs.categories}
                // style={{ width: "100px" }}
                onChange={handleForm}
              >
                {categories?.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className={newBlogStyle["input-group"]}>
              <select
                name="isPublish"
                id="isPublish"
                value={inputs.isPublish}
                onChange={handleForm}
              >
                <option value="true">Publish</option>
                <option value="false">Draft</option>
              </select>
            </div>
            <button>Submit</button>
          </form>
        </section>
      </main>
    </section>
  );
};

export default NewBlog;
