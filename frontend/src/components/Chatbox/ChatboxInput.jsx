import React, { useRef, useState } from "react";
import "../../index.css";
import "../Chatbox/css/ChatboxInput.css";

export const ChatboxInput = ({ onInputSend }) => {
  const [textArea, setTextArea] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (e) => setTextArea(e.target.value);
  const handleInputSend = (e) => {
    if (e.key === "Enter" || e.target.textContent === "SEND") {
      setTextArea("");
      onInputSend(textArea);

      inputRef.current.focus();
    }
  };

  return (
    <div className="chatbox-input-holder">
      <textarea
        className="chatbox-textarea"
        ref={inputRef}
        type="text"
        onChange={handleInputChange}
        value={textArea}
        onKeyDown={handleInputSend}
        rows={1}
        cols={1}
      />
      <button className="chatbox-button" onClick={handleInputSend}>
        SEND
      </button>
    </div>
  );
};
