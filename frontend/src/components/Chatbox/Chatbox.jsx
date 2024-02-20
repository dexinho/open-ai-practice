import React, { useState } from "react";
import { ChatboxInput } from "./ChatboxInput";
import { ChatboxWindow } from "./ChatboxWindow";
import { ChatboxOptions } from "./ChatboxOptions";
import { fetchContent } from "../../utility/fetchContent";
import "../../index.css";
import "../Chatbox/css/Chatbox.css";

export const Chatbox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatbotOptions, setChatbotOptions] = useState({
    username: "",
    chatboxStyle: "default",
  });

  const handleInputSend = async (input) => {
    if (isLoading) return;

    const userMessage = { role: "user", content: input };
    setChatMessages((prevM) => [...prevM, userMessage]);

    try {
      setIsLoading((prevS) => {
        console.log(prevS);
        return true;
      });
      const content = await fetchContent({
        userContent: input,
        systemContent: chatbotOptions,
        messagesHistory: chatMessages,
      });

      const systemMessage = { role: "system", content };
      setChatMessages((prevM) => [...prevM, systemMessage]);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectionSave = ({ username, chatboxStyle }) => {
    console.log(username, chatboxStyle);
    setChatbotOptions({
      username,
      chatboxStyle,
    });
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox">
        <ChatboxOptions onSelectionSave={handleSelectionSave} />
        <ChatboxWindow messages={chatMessages} isLoading={isLoading} />
        <ChatboxInput onInputSend={handleInputSend} />
      </div>
    </div>
  );
};
