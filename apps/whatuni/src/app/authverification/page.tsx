"use client";
import { useEffect, Suspense } from "react";
import { Hub } from "aws-amplify/utils";
import { signInWithRedirect } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCookie } from "@packages/lib/utlils/helper-function";
const Page = () => {

 
  const router = useRouter();
  async function watchForCognitoCookie() {
    signInWithRedirect({
      provider: "Google",
      customState: "home page",
    });
  }
  useEffect(() => {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Add 1 year
    document.cookie = `LogedinviaOnetap=true; path=/; SameSite=Lax; expires=${expiryDate.toUTCString()}`;
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          break;
        case "signInWithRedirect_failure":
          break;
        case "customOAuthState":
          if (payload?.data) {
          
            document.cookie = `LoginSession=true; path=/; SameSite=Lax`;
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
          height="300"
          className="mb-6"
        />
        <p className="font-semibold text-gray-900 text-lg">
          &quot;Working on it, hold on!&quot;
        </p>
        <p className="text-gray-500 text-base mt-2">
          &quot;You&apos;re making good progress, by the way&quot;
        </p>
      </div>
    </Suspense>
  );
};

export default Page;
