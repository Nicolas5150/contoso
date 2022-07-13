// Change to axios in the future to make it more robust and easier via a reliable package.
export async function getJSON(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getMenuData() {
  // Logic to handle if were in prod or dev for data retrieval
  // - could set up local endpoint rather than putting data in public folder
  const development = "data.json";
  const production = "https://prod-link.com";
  const url = process.env.NODE_ENV === "development" ? development : production;
  return await getJSON(url);
}
