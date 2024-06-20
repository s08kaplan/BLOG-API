import React from "react";
import DOMPurify from "dompurify";

const BlogPost = ({ content }) => {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center", margin:"10px"}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }) }} />
  );
};

export default BlogPost;