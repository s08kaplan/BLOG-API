import React from "react";
import DOMPurify from "dompurify";
import style from "./PostStyle.module.scss"

const BlogPost = ({ content }) => {
  // console.log(content);

  return (
    <div className={style.post}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }),
      }}
    />
  );
};

export default BlogPost;
