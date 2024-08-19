import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import DOMPurify from "dompurify";
import profileStyles from "./MyProfile.module.scss"
import BlogPost from "../../Components/BLOG-POST/BlogPost";
import QuillEditor from "../../Components/QUILL/QuillEditor";
import { formRegisterInputs } from "../../Helpers/formInputs";

const MyProfile = () => {
  const { updatedUser } = useAuthCalls();
  const { user } = useSelector((state) => state.auth);

console.log(user);
  const inputRefs = useRef({
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    image: user?.image || [],
    biography: user?.biography || "",
    password: "" 
  });
  
  const [userModal, setUserModal] = useState(false);
  const quillRef = useRef(user?.biography);
  
  const handleForm = (e) => {
    const { name, value } = e.target;
    inputRefs.current[name] = value;
  };
// console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedContent = DOMPurify.sanitize(quillRef.current.getEditor().root.innerHTML, {
      USE_PROFILES: { html: true },
    });    const userInfo = {
      ...inputRefs.current,
      biography: sanitizedContent,
    };
    const userId = user?.id;
    updatedUser(userId, userInfo);
    // inputRefs.current = ""
    setUserModal(false)
  };

  return (
    <main className={profileStyles.main}>
      <section className={profileStyles["profile-header"]}>
        <img
          src={
            (Array.isArray(user?.image) && user?.image[0]) ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt="user photo"
        />
        <h2>{user?.username}</h2>
      </section>
      <section className={profileStyles["profile-body"]}>
        {/* <p>{user?.biography || "biography"}</p> */}
        <BlogPost content={user?.biography}/>
      </section>
      <button onClick={() => setUserModal(!userModal)}>Edit Profile</button>
      <button>my blogs</button>

      {userModal && (
        <div>
          <form onSubmit={handleSubmit}>
 {
  formRegisterInputs.map(item => (
    item.name !== "biography" &&
    <React.Fragment key={item.name}>
        <label htmlFor={item.name}>{item.label}</label>
    <input
      type={item.type}
      id={item.name}
      name={item.name}
      defaultValue={inputRefs.current[item.name]}
      onChange={handleForm}
    />
    </React.Fragment>
  

  ))
 }
            {/* <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={inputRefs.current?.username}
              onChange={handleForm}
            />

            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={inputRefs.current?.firstName}
              onChange={handleForm}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={inputRefs.current?.lastName}
              onChange={handleForm}
            />

            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={inputRefs.current?.email}
              onChange={handleForm}
            />


            <label htmlFor="image">Image</label>
            <input
              type="text"
              id="image"
              name="image"
              defaultValue={inputRefs.current?.image}
              onChange={handleForm}
            /> */}

            <label htmlFor="biography">Biography</label>
            {/* <ReactQuill
              className={profileStyles.quill}
              id="biography"
              theme="snow"
              name="quill"
              value={inputRefs.current.biography}
              ref={quillRef}
              modules={modules}
            /> */}
            <QuillEditor
            name="quill"
            value={inputRefs.current?.biography}
            ref={quillRef}
            />

            <button>Submit</button>
          </form>
        </div>
      )}
    </main>
  );
};

export default MyProfile;
