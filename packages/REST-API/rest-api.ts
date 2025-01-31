import { v4 as uuidv4 } from "uuid";
const makeApiCall = async (
  url: string,
  method: string,
  headers: Record<string, string> = {},
  queryParams: string | null,
  bodyjson: any
): Promise<any> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BFF_API_DOMAIN}/hewebsites/v1/${url}${
    queryParams ? `?${queryParams}` : ""
  }`;
  try {
    const response = await fetch(apiUrl, {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
        "x-correlation-id": uuidv4(),
        "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
        ...headers,
      },
      body: method === "GET" ? undefined : JSON.stringify(bodyjson),
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({}));
      console.error({
        error: errorResponse,
        endpoint: apiUrl,
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`API call failed: ${error.message}`, { endpoint: apiUrl });
      throw error;
    } else {
      console.error("Unknown error occurred", { endpoint: apiUrl, error });
      throw new Error("An unknown error occurred during the API call.");
    }
  }
};

export default makeApiCall;
