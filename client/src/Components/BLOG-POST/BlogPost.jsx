import React from "react";
import DOMPurify from "dompurify";

const BlogPost = ({ content }) => {
  console.log(content);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }),
      }}
    />
  );
};

export default BlogPost;
