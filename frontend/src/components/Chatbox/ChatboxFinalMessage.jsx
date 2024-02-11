import React, { useCallback, useEffect, useState, useRef } from "react";

export const ChatboxFinalMessage = ({ message, chatboxWindowRef }) => {
  const [finalMessage, setFinalMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const finalMessageRef = useRef(null);

  const handleAutoScroll = useCallback(() => {
    let scrollOffset = 100;

    const chatboxHeight = parseInt(
      getComputedStyle(chatboxWindowRef.current).height,
      10
    );

    if (
      chatboxWindowRef.current.scrollHeight -
        chatboxWindowRef.current.scrollTop >
      chatboxHeight + scrollOffset
    ) {
      setIsAutoScrolling(false);
    } else {
      setIsAutoScrolling(true);
    }
  }, [chatboxWindowRef]);

  const handleFinalMessage = () => {
    if (currentIndex + 1 === message.length) {
      chatboxWindowRef.current.scrollTop =
        chatboxWindowRef.current.scrollHeight;
      return;
    }

    let id = setTimeout(() => {
      setFinalMessage((prevM) => prevM + message[currentIndex]);
      setCurrentIndex((prevI) => prevI + 1);

      if (finalMessageRef.current && isAutoScrolling) {
        finalMessageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 10);

    chatboxWindowRef.current.addEventListener("scroll", handleAutoScroll);

    return () => {
      clearTimeout(id);
      chatboxWindowRef.current.removeEventListener("scroll", handleAutoScroll);
    };
  };

  useEffect(handleFinalMessage, [currentIndex, isAutoScrolling]);

  return <div ref={finalMessageRef}>{finalMessage}</div>;
};

// import React, { useEffect, useState, useRef } from "react";

// export const ChatboxFinalMessage = ({ message, chatboxWindowRef }) => {
//   const [finalMessage, setFinalMessage] = useState("");
//   const finalMessageRef = useRef(null);

//   useEffect(() => {
//     let index = 0;
//     let isAutoScrolling = true;

//     const messageIntervalId = setInterval(() => {
//       setFinalMessage((prevF) => {
//         return prevF + message[index];
//       });

//       index++;

//       if (index === message.length - 1) {
//         clearInterval(messageIntervalId);
//       }

//       if (finalMessageRef.current && isAutoScrolling) {
//         finalMessageRef.current.scrollIntoView({
//           behavior: "smooth",
//           block: "end",
//         });
//       }
//     }, 10);

//     const handleAutoScroll = (e) => {
//       const elementHeight = parseInt(getComputedStyle(e.target).height, 10);

//       if (e.target.scrollHeight - e.target.scrollTop > elementHeight + 50)
//         isAutoScrolling = false;
//       else isAutoScrolling = true;
//     };

//     chatboxWindowRef.current.addEventListener("scroll", handleAutoScroll);

//     return () => {
//       chatboxWindowRef.current.scrollTop =
//         chatboxWindowRef.current.scrollHeight;

//       clearInterval(messageIntervalId);

//       chatboxWindowRef.current.removeEventListener("scroll", handleAutoScroll);
//     };
//   }, []);

//   return <div ref={finalMessageRef}>{finalMessage}</div>;
// };
