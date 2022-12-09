//helper function to make API calls
export const getData = async ({ url }: { url: string }) => {
  const options = { method: "GET", headers: { accept: "application/json" } };
  try {
    const resp = await fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.error(err));

    return await resp?.results;
  } catch (err: any) {
    const error = err?.response?.data;
    console.log("error", error);
    return [];
  }
};
