"use client";
import { useEffect } from "react";
const LocationAccess = () => {
  useEffect(() => {
    function requestLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
            } else if (error.code === error.POSITION_UNAVAILABLE) {
            } else if (error.code === error.TIMEOUT) {
            } else {
            }
          }
        );
      } else {
      }
    }
    requestLocation();
  }, []);
  return null;
};

export default LocationAccess;
