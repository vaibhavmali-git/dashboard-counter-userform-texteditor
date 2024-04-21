import React, { useState, useRef } from "react";
import "./styles.css";
import JoditEditor from "jodit-react";
import { useEffect } from "react";

function TextEditor() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Function to convert JSON data to a readable text
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
    const savedContent = localStorage.getItem("userData");
    if (savedContent) {
      const parsedData = JSON.parse(savedContent);
      const formattedContent = formatData(parsedData);
      setContent(formattedContent);
    }
  }, []);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    localStorage.setItem("userData", newContent);
  };

  return (
    <>
      <h1 className="user-dataH1">Text Editor</h1>
      <div id="textedior">
        <div div="rich-editor">
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </div>
    </>
  );
}

export default TextEditor;
