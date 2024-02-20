import React, { useEffect, useState } from "react";

export const ChatboxMessage = ({ message, isLastMessage }) => {
  const [messageToDisplay, setMessageToDisplay] = useState("");
  const [index, setIndex] = useState(0);
  // const [test, setTest] = useState(0);
  // const [test2, setTest2] = useState(0);

  useEffect(() => {
    // let index = 0;
    // let messageIntervalId = 0;
    let indexTimeoutId = 0;

    if (isLastMessage) {
      setMessageToDisplay(message);
      return;
    }

    // const writeMessageLetterByLetter = () => {
    // messageIntervalId = setInterval(() => {
    // setTest(() => {
    //   console.log("%cTest1", "color: yellow", test);
    //   return index + 1;
    // });

    setMessageToDisplay((prevF) => {
      console.log("index", index, messageToDisplay);
      console.log("------------------");

      return prevF + messageToDisplay[index];
    });

    indexTimeoutId = setTimeout(() => {
      setIndex(index + 1);
    }, 100);

    // setTest2(() => {
    //   console.log("%cTest2", "color: orange", test2);
    //   return index + 10;
    // });

    // index++;

    console.log(
      "%cInterval running",
      "color: green; font-weight: bold;",
      indexTimeoutId
    );

    if (index === message.length - 1) {
      clearTimeout(indexTimeoutId);
    }
    // }, 1000);
    // };

    return () => {
      clearTimeout(indexTimeoutId);
      // clearInterval(messageIntervalId);
    };
  }, [index]);

  return <div>{messageToDisplay}</div>;
};

// import React, { useCallback, useEffect, useState, useRef } from "react";

// export const ChatboxFinalMessage = ({ message, chatboxWindowRef }) => {
//   const [finalMessage, setFinalMessage] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoScrolling, setIsAutoScrolling] = useState(true);
//   const finalMessageRef = useRef(null);

//   const handleAutoScroll = useCallback(() => {
//     let scrollOffset = 100;

//     const chatboxHeight = parseInt(
//       getComputedStyle(chatboxWindowRef.current).height,
//       10
//     );

//     if (
//       chatboxWindowRef.current.scrollHeight -
//         chatboxWindowRef.current.scrollTop >
//       chatboxHeight + scrollOffset
//     ) {
//       setIsAutoScrolling(false);
//     } else {
//       setIsAutoScrolling(true);
//     }
//   }, [chatboxWindowRef]);

//   const handleFinalMessage = () => {
//     if (currentIndex + 1 === message.length) {
//       chatboxWindowRef.current.scrollTop =
//         chatboxWindowRef.current.scrollHeight;
//       return;
//     }

//     let id = setTimeout(() => {
//       setFinalMessage((prevM) => prevM + message[currentIndex]);
//       setCurrentIndex((prevI) => prevI + 1);

//       if (finalMessageRef.current && isAutoScrolling) {
//         finalMessageRef.current.scrollIntoView({
//           behavior: "smooth",
//           block: "end",
//         });
//       }
//     }, 10);

//     chatboxWindowRef.current.addEventListener("scroll", handleAutoScroll);

//     return () => {
//       clearTimeout(id);
//       chatboxWindowRef.current.removeEventListener("scroll", handleAutoScroll);
//     };
//   };

//   useEffect(handleFinalMessage, [currentIndex, isAutoScrolling]);

//   return <div ref={finalMessageRef}>{finalMessage}</div>;
// };
