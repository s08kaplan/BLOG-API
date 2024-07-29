import React from "react";
import DOMPurify from "dompurify";

const BlogPost = ({ content, edited }) => {
  console.log(edited);
  
  return (
<>
  {content != edited ? <div  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }) }} />
  :
  <div  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(edited, { USE_PROFILES: { html: true } }) }} />
  }
</>
 
  );
};

export default BlogPost;