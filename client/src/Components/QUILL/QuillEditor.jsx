import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../../Helpers/quillModules";
import style from "./QuillStyle.module.scss";

const QuillEditor = forwardRef(({ value, onChange }, ref) => {
  const [content, setContent] = useState(value || "");

  // Sync internal state with value prop when it changes
  useEffect(() => {
    if (value !== undefined && value !== content) {
      setContent(value);
      console.log("value: ", value);
console.log("content: ", content);
    }
  }, [value]);
console.log("value: ", value);
console.log("content: ", content);
  // Handle changes in the editor
  const handleChange = (content, delta, source, editor) => {
    if (editor) {
      console.log("Editor exists");
      console.log("Plain Text:", editor.getText());
      console.log("HTML:", editor.getHTML());
    } else {
      console.log("Editor does not exist or is not passed correctly");
    }
    const sanitizedContent = DOMPurify.sanitize(content);
    setContent(sanitizedContent);
    if (onChange) {
      onChange(sanitizedContent);
    }
  };

  // Expose methods through ref
  useImperativeHandle(ref, () => ({
    getValue: () => content,
    setValue: (newValue) => {
      setContent(DOMPurify.sanitize(newValue));
      if (onChange) {
        onChange(DOMPurify.sanitize(newValue));
      }
    },
    clear: () => setContent(""),
  }));

  return (
    <section className={style.quill} data-test="quillEditor">
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        className={style.inner}
        style={{ 
          wordWrap: "break-word", 
          overflowWrap: "break-word", 
          wordBreak: "break-word", 
          whiteSpace: "normal" ,
          maxWidth:"100%",
        }}
      />
    </section>
  );
});

export default QuillEditor;
