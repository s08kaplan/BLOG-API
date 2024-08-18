import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuill = () => {
  const [value, setValue] = useState("");
  return (
    <ReactQuill
      data-test="registerBiography"
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
};

export default ReactQuill;
