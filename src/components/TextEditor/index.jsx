import React, { useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import JoditEditor from "jodit-react";

function TextEditor() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
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
