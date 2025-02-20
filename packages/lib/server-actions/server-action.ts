"use server";

import { fetchAuthSession } from "@aws-amplify/auth";
import { API_END_POINTS } from "../utlils/API_END_POINTS";
import { v4 as uuidv4 } from "uuid";
import { currentAuthenticatedUser } from "../utlils/helper-function";

export async function graphQlFetchFunction(
  payload: string,
  isContentPreview?: boolean
) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isContentPreview ? process.env.NEXT_PUBLIC_PREVIEW_GRAPHQL_AUTH : process.env.NEXT_PUBLIC_GRAPHQL_AUTH}`,
      },
      body: JSON.stringify({ query: payload }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function searchAjaxFecthFunction(payload: Record<string, any>) {
  try {
    const queryParams = new URLSearchParams(payload).toString();
    const url = `${process.env.NEXT_PUBLIC_BFF_API_DOMAIN}/hewebsites/v1/homepage/sub-inst-ajax?${queryParams}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
      },
      cache: "no-store",
    });

    // Parse the JSON response
    const data = await res.json();
    return data;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

export async function callClickstreamAPI(payload: any) {
  try {
    const session = await fetchAuthSession();
    const tracksession_id = uuidv4().replace(/\D/g, "").slice(0, 8);
    const headers: any = {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
      tracksessionid: tracksession_id,
    };
    let apiUrl = `${process.env.NEXT_PUBLIC_BFF_API_DOMAIN}`;

    if (session.tokens?.idToken) {
      headers.Authorization = `${session.tokens.idToken}`;
      apiUrl += API_END_POINTS.user.clickstream;
    } else {
      apiUrl += API_END_POINTS.guest.clickstream;
    }

    const respone = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: payload ? JSON.stringify(payload) : undefined,
    });
  } catch (error: any) {
    console.log("Clickstram error: ", error);
  }
}
