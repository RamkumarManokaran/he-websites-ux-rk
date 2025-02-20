#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { PgsHeCdkStack } from "../lib/cdk-stack";
const app = new cdk.App();
new PgsHeCdkStack(app, "PgsHeCdkStack", {
  env: { account: process.env.AWS_ACCOUNT_ID, region: process.env.AWS_REGION },
});
