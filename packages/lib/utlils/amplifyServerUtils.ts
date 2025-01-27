import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import awsconfig from "../../configs/amplifyconfiguration";
export const { runWithAmplifyServerContext } = createServerRunner({
  config: awsconfig,
});
