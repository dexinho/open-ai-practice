import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "../../index.css";
import "../Chatbox/css/ChatboxOptions.css";

export const ChatboxOptions = ({ onSelectionSave }) => {
  const [chatboxStyle, setChatboxStyle] = useState("default");
  const [usernameInput, setUsernameInput] = useState("");
  const [isChatboxDialogOpen, setIsChatboxDialogOpen] = useState(false);
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const chatboxDialogRef = useRef(null);

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    if (e.target.value !== "Custom") {
      setIsCustomSelected(false);
      setChatboxStyle(e.target.value);
    } else setIsCustomSelected(true);
  };

  const handleUsernameInputChange = (e) => {
    setUsernameInput(e.target.value);
  };

  const handleSelectionSave = () => {
    onSelectionSave({
      username: usernameInput,
      chatboxStyle: chatboxStyle,
    });

    setIsChatboxDialogOpen(false);
  };

  const handleChatboxSettings = () => {
    setIsChatboxDialogOpen(true);
  };

  useEffect(() => {
    const handleClickOutsideOfDialog = (e) => {
      if (
        chatboxDialogRef.current &&
        !chatboxDialogRef.current.contains(e.target)
      ) {
        setIsChatboxDialogOpen(false);
      }
    };

    if (isChatboxDialogOpen) {
      document.addEventListener("mousedown", handleClickOutsideOfDialog);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideOfDialog);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideOfDialog);
    };
  }, [isChatboxDialogOpen]);

  const handleCustomInputChange = (e) => setChatboxStyle(e.target.value);

  return (
    <div className="chatbox-selection-holder">
      <div
        className="chatbox-options-button-holder"
        onClick={handleChatboxSettings}
      >
        <FontAwesomeIcon icon={faGear} />
      </div>
      <dialog
        ref={chatboxDialogRef}
        className="chatbox-selection-dialog"
        open={isChatboxDialogOpen}
      >
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
          {isCustomSelected && (
            <input
              type="text"
              onChange={handleCustomInputChange}
              placeholder="custom ai style..."
            />
          )}
          <button onClick={handleSelectionSave}>SAVE</button>
        </div>
      </dialog>
    </div>
  );
};
