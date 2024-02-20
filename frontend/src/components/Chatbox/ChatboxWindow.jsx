import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import "../Chatbox/css/ChatboxWindow.css";
import robotImage from "../../assets/robot.jpg";
import userImage from "../../assets/user.png";
import { Loading } from "../Loading/Loading";
import { ChatboxMessage } from "./ChatboxMessage";

export const ChatboxWindow = ({ messages, isLoading }) => {
  const chatboxWindowRef = useRef(null);

  useEffect(() => {
    if (chatboxWindowRef.current)
      chatboxWindowRef.current.scrollTop =
        chatboxWindowRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chatbox-window-container">
      <div ref={chatboxWindowRef} className="chatbox-window">
        {messages.map((message, index) => (
          <div
            className="chabox-message-div"
            key={index}
            style={{ backgroundColor: index % 2 ? "aliceblue" : "white" }}
          >
            <div>
              <img
                src={message.role === "system" ? robotImage : userImage}
                className="chatbox-image"
                alt="image"
              />
            </div>
            <div className="chatbox-message">
              {
                <ChatboxMessage
                  message={message.content}
                  isLastMessage={
                    messages.length % 2 === 0 && messages.length === index + 1
                  }
                />
              }
            </div>
          </div>
        ))}
        {isLoading && <Loading />}
      </div>
    </div>
  );
};
