import React, { useEffect, useState, useCallback } from "react";
import "../../index.css";
import "../Chatbox/css/Loading.css";

export const Loading = () => {
  const [dots, setDots] = useState(".");

  const updateDots = useCallback(() => {
    setDots((prevD) => (prevD.length < 5 ? prevD + "." : "."));
  }, []);

  useEffect(() => {
    const dotsInterval = setInterval(updateDots, 200);

    return () => clearInterval(dotsInterval);
  }, [updateDots]);

  return <div className="loading">{dots}</div>;
};
