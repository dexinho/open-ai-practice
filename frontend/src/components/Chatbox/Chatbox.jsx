import React, { useState } from "react";

export const Chatbox = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleFetchResponse = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const fetchResponse = await fetch(`http://localhost:3000/open-ai`, {
        method: "POST",
        body: JSON.stringify({content: input}),
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (fetchResponse.ok) {
        const fetchedData = await fetchResponse.json();

        setOutput(fetchedData.content)
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input type="text" onChange={handleInputChange} value={input} />
      <button onClick={handleFetchResponse}>SEND</button>
      <div>{output}</div>
    </div>
  );
};
