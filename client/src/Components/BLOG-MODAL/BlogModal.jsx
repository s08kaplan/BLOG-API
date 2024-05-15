import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const BlogModal = () => {
  const [inputs, setInputs] = useState({
    title: "",
    image: "",
    categories: "",
    isPublish: "",
  });
  const [text, setText] = useState("");

  const handleForm = (e) => {
    const { name, value } = e.target;
    const sanitizedContent = DOMPurify.sanitize(text);
    const content = sanitizedContent.replace(/<[^>]*>/g, "");
    console.log(content);

    setInputs({
      ...inputs,
      [name]: value,
      content,
    });
  };
  console.log(inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postBlog("blogs", inputs);
    setInputs({ title: "", image: "", categories: "", isPublish: "" });
    setText("");
  };

  const postBlog = async (url, postData) => {
    try {
      const { data } = await axiosWithToken.post(`${url}/`, postData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
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
          <ReactQuill
            className={newBlogStyle.quill}
            theme="snow"
            value={text}
            onChange={setText}
          />
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
            key={Date.now()}
            name="categories"
            id="categories"
            value={inputs.categories}
            // style={{ width: "100px" }}
            onChange={handleForm}
          >
            <option>Select Category</option>
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
            <option value="">Select Publish Status</option>
            <option value="true">Publish</option>
            <option value="false">Draft</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default BlogModal;
