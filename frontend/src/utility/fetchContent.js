export const fetchContent = async ({systemContent, userContent}) => {
  console.log({ systemContent, userContent })
  try {
    const fetchResponse = await fetch(`http://localhost:3000/open-ai`, {
      method: "POST",
      body: JSON.stringify({ systemContent, userContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (fetchResponse.ok) {
      const fetchedData = await fetchResponse.json();

      return fetchedData.content;
    }

    return [];
  } catch (err) {
    console.log(err);

    return [];
  }
};
