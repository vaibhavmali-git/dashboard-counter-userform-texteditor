import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import "./styles.css";

const TextEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const formatData = (data) => {
    if (Array.isArray(data)) {
      return data
        .map((item) => {
          const { name, address, email, phone } = item;
          return `Name: ${name}\nAddress: ${address}\nEmail: ${email}\nPhone: ${phone}\n`;
        })
        .join("\n");
    }
    return "";
  };

  // Load data from local storage when the component mounts
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const editorContent = localStorage.getItem("editorContent");

    if (editorContent) {
      setContent(editorContent);
    } else if (userData) {
      const parsedData = JSON.parse(userData);
      const formattedData = formatData(parsedData);
      setContent(formattedData);
    }
  }, []);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    localStorage.setItem("editorContent", newContent);
  };

  return (
    <div>
      <h1 className="user-dataH1">Text Editor</h1>
      <div id="textedior">
        <div className="rich-editor">
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => handleEditorChange(newContent)}
            onChange={(newContent) => handleEditorChange(newContent)}
          />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
