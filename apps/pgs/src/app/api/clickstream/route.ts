import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);

    // Construct the body for the POST request
    const body = {
      siteName: searchParams.get("siteName") || "Whatuni",
      affilateId: Number(searchParams.get("affilateId")) || 987822,
      pageName: searchParams.get("pageName") || "",
      CTATitle: searchParams.get("CTATitle") || "Continue with Google",
      signupMethod: searchParams.get("signupMethod") || "GoogleOneTap",
      signedInMethod: searchParams.get("signedInMethod") || "GoogleOneTap",
      functionalityName: searchParams.get("functionalityName") || "Sign Up",
      eventType: searchParams.get("eventType") || "SignedUp",
      actionType: searchParams.get("actionType") || "Interaction",
      deviceWidth: Number(searchParams.get("deviceWidth")) || 1024, // Default width
    };
    // Make the POST request
    const response = await fetch(
      "https://idp-cug-dom-services-dev-web-service:8080/dom-services/clickstream-logging",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "DYGMTGMQVZZQ9TG58DSSR1XKFJOXWBRO3AM2XRFW",
        },
        body: JSON.stringify(body),
      }
    );

    // Handle the response from the POST request
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Error in API call", details: errorData },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(
      { message: "API call successful", data: result },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "An error occurred", details: error?.message },
      { status: 500 }
    );
  }
}
