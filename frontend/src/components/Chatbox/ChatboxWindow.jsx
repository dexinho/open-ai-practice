import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import "../Chatbox/css/ChatboxWindow.css";
import robotImage from "../../assets/robot.jpg";
import userImage from "../../assets/user.png";
import { Loading } from "../Loading/Loading";
import { ChatboxFinalMessage } from "./ChatboxFinalMessage";

export const ChatboxWindow = ({ messages, isLoading }) => {
  const chatboxWindowRef = useRef(null);

  useEffect(() => {
    if (chatboxWindowRef.current)
      chatboxWindowRef.current.scrollTop =
        chatboxWindowRef.current.scrollHeight;
  }, [messages]);

  const handleListMessages = () => {
    const list = () => {
      return (
        <div ref={chatboxWindowRef} className="chatbox-window">
          {messages.map((message, index) => (
            <div className="chabox-message-div" key={index} style={{backgroundColor: index % 2 ? 'aliceblue' : 'white'}}>
              <div>
                <img
                  src={message.role === "system" ? robotImage : userImage}
                  className="chatbox-image"
                  alt="image"
                />
              </div>
              <div className="chatbox-message">
                {messages.length % 2 === 0 && messages.length === index + 1 ? (
                  <ChatboxFinalMessage
                    chatboxWindowRef={chatboxWindowRef}
                    message={message.content}
                  />
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          {isLoading && <Loading />}
        </div>
      );
    };

    return list();
  };

  return <div className="chatbox-window-container">{handleListMessages()}</div>;
};
