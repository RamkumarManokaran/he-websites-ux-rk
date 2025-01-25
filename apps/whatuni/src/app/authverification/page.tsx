"use client";
import { useEffect, Suspense } from "react";
import { Hub } from "aws-amplify/utils";
import { useSearchParams } from "next/navigation";
import { signInWithRedirect } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Page = () => {
  const router = useRouter();
  async function watchForCognitoCookie() {
    signInWithRedirect({
      provider: "Google",
      customState: "home page",
    });
  }
  useEffect(() => {
    if (window) {
      const t = window.location.pathname;
      console.log(t);
    }
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          break;
        case "signInWithRedirect_failure":
          break;
        case "customOAuthState":
          console.log(payload, "payload");
          if (payload?.data) {
            router.push(payload?.data);
          }

          break;
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Suspense>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          src="/static/assets/images/illustration-sand-clock-animation.gif"
          alt="loader"
          width="280"
          className="mb-6"
        />
        <p className="font-semibold text-gray-900 text-lg">
          "Working on it, hold on!"
        </p>
        <p className="text-gray-500 text-base mt-2">
          "You're making good progress, by the way"
        </p>
      </div>
    </Suspense>
  );
};

export default Page;
