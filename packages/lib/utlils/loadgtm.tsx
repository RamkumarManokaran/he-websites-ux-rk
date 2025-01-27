'use client';

import { useEffect } from 'react';

const GTMScript = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const script = document.createElement('script');
      script.id = 'gtm-ga-script';
      script.async = true;
      script.innerHTML = `
        (function(w,d,s,l,i){
          w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_WU_GTM_ACCOUNT || ""}');
      `;
      document.head.appendChild(script);
    }, 0); 

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);

  return null;
};

export default GTMScript;
