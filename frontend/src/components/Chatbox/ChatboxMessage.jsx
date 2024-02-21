import React, { useEffect, useState } from "react";

export const ChatboxMessage = ({ message, isLastMessage }) => {
  const [messageToDisplay, setMessageToDisplay] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isLastMessage || index + 1 === message.length) {
      setMessageToDisplay(message);
      return;
    }

    const messageTimeoutId = setTimeout(() => {
      setMessageToDisplay(messageToDisplay + message[index]);
      setIndex(index + 1);
    }, 10);

    return () => clearTimeout(messageTimeoutId);
  }, [index]);

  return <div>{messageToDisplay}</div>;
};