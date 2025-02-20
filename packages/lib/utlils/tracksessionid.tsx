"use client";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const TrackSessionId = () => {
  useEffect(() => {
    const name = "trackSessionId";
    const cookies = document?.cookie?.split("; ");
    const cookie = cookies?.find((mycookie) => mycookie.startsWith(`${name}=`));
    const cookiePresent = cookie?.split("=")[1] || null;
    if (!cookiePresent) {
      const trackSessionId = uuidv4();
      document.cookie = `${name}=${trackSessionId}; path=/; max-age= 2592000`;
    }
  }, []);
  return null;
};
export default TrackSessionId;
