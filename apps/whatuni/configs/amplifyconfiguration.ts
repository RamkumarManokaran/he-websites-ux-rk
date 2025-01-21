const awsconfig: any = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
      loginWith: {
        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: `${process.env.NEXT_PUBLIC_ENVIRONMENT === "prd" ? "" : process.env.NEXT_PUBLIC_ENVIRONMENT}${process.env.NEXT_PUBLIC_ENVIRONMENT === "prd" ? "" : "-"}idpc-dom-user.auth.eu-west-2.amazoncognito.com`,
          scopes: [
            //'phone',
            "email",
            "profile",
            "openid",
            //'aws.cognito.signin.user.admin'
          ],
          redirectSignIn: ["https://mdev.dev.aws.whatuni.com"],
          redirectSignOut: ["https://mdev.dev.aws.whatuni.com"],
          responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
      },
    },
  },
};

export default awsconfig;
