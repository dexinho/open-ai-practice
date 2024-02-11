import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "../Chatbox/css/ChatboxOptions.css";

export const ChatboxOptions = ({ onSelectionSave }) => {
  const [chatboxStyle, setChatboxStyle] = useState("default");
  const [usernameInput, setUsernameInput] = useState("");
  const [isChatboxDialogVisible, setIsChatboxDialogVisible] = useState(false);
  const chatboxDialogRef = useRef(null);

  const handleSelectChange = (e) => {
    setChatboxStyle(e.target.value);
  };

  const handleUsernameInputChange = (e) => {
    setUsernameInput();
  };

  const handleSelectionSave = () => {
    onSelectionSave({
      username: usernameInput,
      chatboxSelection: chatboxStyle,
    });

    setIsChatboxDialogVisible(false);
  };

  const handleChatboxSettings = () => {
    chatboxDialogRef.current.show();
    setIsChatboxDialogVisible(true);
  };

  useEffect(() => {
    const handleClickOutsideOfDialog = (e) => {
      if (
        !isChatboxDialogVisible &&
        chatboxDialogRef.current &&
        !chatboxDialogRef.current.contains(e.target)
      ) {
        setIsChatboxDialogVisible(false);
        chatboxDialogRef.current.close();
      }
    };

    document.addEventListener("click", handleClickOutsideOfDialog);

    return () => {
      document.removeEventListener("click", handleClickOutsideOfDialog);
      setIsChatboxDialogVisible(false);
    };
  }, [isChatboxDialogVisible]);

  return (
    <div className="chatbox-selection-holder">
      <div
        className="chatbox-options-button-holder"
        onClick={handleChatboxSettings}
      >
        <FontAwesomeIcon icon={faGear} />
      </div>
      <dialog ref={chatboxDialogRef} className="chatbox-selection-dialog">
        <div className="chatbox-options-holder">
          <input
            type="text"
            placeholder="your name..."
            onChange={handleUsernameInputChange}
          />
          <select onChange={handleSelectChange}>
            <option>Chatbot Style</option>
            <option>Historian</option>
            <option>Pirate</option>
            <option>Philosopher</option>
            <option>Custom</option>
          </select>
          <button onClick={handleSelectionSave}>SAVE</button>
        </div>
      </dialog>
    </div>
  );
};
