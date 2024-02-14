import React, { useRef, useState } from "react";
import "../../index.css";
import "../Chatbox/css/ChatboxInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const ChatboxInput = ({ onInputSend }) => {
  const [textArea, setTextArea] = useState("");
  const textAreaRef = useRef(null);

  const handleInputChange = (e) => {
    setTextArea(e.target.value);
  };
  const handleInputSend = (e) => {
    if (
      (e.key === "Enter" || e.target.classList.contains("fa-paper-plane")) &&
      textArea.trim()
    ) {
      e.preventDefault();
      setTextArea("");
      onInputSend(textArea.trim());

      textAreaRef.current.focus();
    }
  };

  return (
    <div className="chatbox-input-holder">
      <textarea
        className="chatbox-textarea"
        ref={textAreaRef}
        type="text"
        rows={1}
        cols={1}
        onChange={handleInputChange}
        value={textArea}
        onKeyDown={handleInputSend}
      ></textarea>
      <button className="chatbox-button" onClick={handleInputSend}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};
