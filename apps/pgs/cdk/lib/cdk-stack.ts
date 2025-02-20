import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import {
  Function,
  Runtime,
  Code,
  InvokeMode,
  FunctionUrlAuthType,
  Architecture,
  Tracing,
} from "aws-cdk-lib/aws-lambda";
import * as logs from "aws-cdk-lib/aws-logs";
import { Vpc, Subnet, SecurityGroup } from "aws-cdk-lib/aws-ec2";
import {
  PolicyStatement,
  ServicePrincipal,
  Policy,
  Effect,
  AnyPrincipal,
  Role,
} from "aws-cdk-lib/aws-iam";
import { MyLogGroupArm } from "./logGroupArn";

export class PgsHeCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    const [VPC_SUBNET1_VALUE, VPC_SUBNET2_VALUE, VPC_SUBNET3_VALUE] =
      process.env.AWS_VPC_SUBNETS?.split(",") ?? [];

    super(scope, id, props);
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    // Create a new S3 bucket to store Next.js build artifacts
    // const myBucket = new s3.Bucket(this, "NewREWebSiteBucket", {
    //   bucketName: process.env.AWS_PGS_S3_BUCKET_NAME,

    //   enforceSSL: true,
    //   versioned: true,
    //   blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    //   encryption: s3.BucketEncryption.S3_MANAGED,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY, // Optional: Set removal policy
    // });
    const myBucket = s3.Bucket.fromBucketName(
      this,
      "ExistingBucket",
      process.env.AWS_PGS_S3_BUCKET_NAME || ""
    );

    // const allowCloudFrontReadOnlyPolicy = new PolicyStatement({
    //   actions: ["s3:GetObject"],
    //   principals: [new ServicePrincipal("cloudfront.amazonaws.com")],
    //   effect: Effect.ALLOW,
    //   conditions: {
    //     StringEquals: {
    //       "AWS:SourceArn": `arn:aws:cloudfront::${
    //         cdk.Stack.of(this).account
    //       }:distribution/${process.env.PGS_CLOUD_FRONT_DISTRIBUTION_ID}`,
    //     },
    //   },
    //   resources: [`${myBucket.bucketArn}/*`],
    // });

    // const secureTransportS3PolicyStatement = new PolicyStatement({
    //   actions: ["s3:*"],
    //   principals: [new AnyPrincipal()],
    //   effect: Effect.DENY,
    //   conditions: {
    //     Bool: {
    //       "aws:SecureTransport": "false",
    //     },
    //   },
    //   resources: [`${myBucket.bucketArn}/*`, `${myBucket.bucketArn}`],
    // });

    // myBucket.addToResourcePolicy(secureTransportS3PolicyStatement);
    // myBucket.addToResourcePolicy(allowCloudFrontReadOnlyPolicy);

    // cdk.Tags.of(myBucket).add("ApplicationService", "CS Channel: HE websites");
    // cdk.Tags.of(myBucket).add("Classification", "unclassified");
    // cdk.Tags.of(myBucket).add("Name", pgsBucketName || "");
    // cdk.Tags.of(myBucket).add("ProjectName", "HE Websites");

    const vpc = Vpc.fromLookup(this, "ExistingVpc", {
      // region: "ap-south-1",
      tags: { Name: process.env.AWS_VPC_TAG_NAME || "" },
    });
    const subnet1 = Subnet.fromSubnetId(this, "subnet1", VPC_SUBNET1_VALUE);
    const subnet2 = Subnet.fromSubnetId(this, "subnet2", VPC_SUBNET2_VALUE);
    const subnet3 = Subnet.fromSubnetId(this, "subnet3", VPC_SUBNET3_VALUE);

    const vpcConfig = Vpc.fromVpcAttributes(this, "VPC", {
      vpcId: vpc.vpcId,
      availabilityZones: cdk.Fn.getAzs(),
      privateSubnetIds: [subnet1.subnetId, subnet2.subnetId, subnet3.subnetId],
      privateSubnetRouteTableIds: [
        subnet1.routeTable.routeTableId,
        subnet2.routeTable.routeTableId,
        subnet3.routeTable.routeTableId,
      ],
    });

    const securityGroup = SecurityGroup.fromLookupByName(
      this,
      "SG",
      process.env.AWS_SECURITY_GROUP || "",
      vpc
    );
    // Upload files to the S3 bucket
    new s3deploy.BucketDeployment(this, "DeployNextjsAssets", {
      sources: [s3deploy.Source.asset("../.open-next/assets")],
      destinationBucket: myBucket,
      vpc: vpcConfig,
    });
    const serverFunctionName = process.env.PGS_SERVER_FN_LAMBDA_NAME || "";
    // const logGroupArn = `arn:aws:logs:${this.region}:${this.account}:log-group:/aws/lambda/${serverFunctionName}:*`;
    // const cloudwatchPolicyStatement = new PolicyStatement({
    //   effect: Effect.ALLOW,
    //   actions: [
    //     "logs:CreateLogStream",
    //     "logs:DescribeLogStreams",
    //     "logs:PutLogEvents",
    //     "logs:CreateLogGroup",
    //     "cloudwatch:PutMetricData"
    //   ],
    //   resources: [logGroupArn],
    // });

    const myService = new MyLogGroupArm();

    const cloudwatchPolicyStatement: any = myService.setLogGroup(
      this.region,
      this.account,
      serverFunctionName
    );

    const ec2XrayPolicyStatement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeInstances",
        "ec2:AttachNetworkInterface",
        "ec2:DescribeVpcs",
        "xray:PutTraceSegments",
        "xray:PutTelemetryRecords",
        "xray:GetSamplingRules",
        "xray:GetSamplingTargets",
        "xray:GetSamplingStatisticSummaries",
      ],
      resources: ["*"],
    });

    // Create the IAM policy
    const myPolicy = new Policy(this, "MyPolicy", {
      policyName: `${serverFunctionName}-permission`,
      statements: [cloudwatchPolicyStatement, ec2XrayPolicyStatement],
    });

    cdk.Tags.of(myPolicy).add("ApplicationService", "CS Channel: HE websites");
    cdk.Tags.of(myPolicy).add("Classification", "unclassified");
    cdk.Tags.of(myPolicy).add("Name", `${serverFunctionName}-permission`);
    cdk.Tags.of(myPolicy).add("ProjectName", "HE websites");

    // Create the IAM role
    const myRole = new Role(this, "MyRole", {
      roleName: `${serverFunctionName}-exec-role`,
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"), // or any other service that should assume this role
    });

    cdk.Tags.of(myRole).add("ApplicationService", "CS Channel: HE websites");
    cdk.Tags.of(myRole).add("Classification", "unclassified");
    cdk.Tags.of(myRole).add("Name", `${serverFunctionName}-exec-role`);
    cdk.Tags.of(myRole).add("ProjectName", "HE websites");

    // Attach the policy to the role
    myPolicy.attachToRole(myRole);

    //Create Lambda function
    const nextjsLambda = new Function(this, "NextjsLambda", {
      functionName: serverFunctionName,
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset("../.open-next/server-functions/default"), // Directory containing your Next.js application code
      handler: "index.handler",
      timeout: cdk.Duration.seconds(30), // Adjust as needed
      memorySize: 1024, // Adjust as needed
      environment: {
        NEXT_PUBLIC_S3_BUCKET: myBucket.bucketName, // Make S3 bucket name accessible in Lambda
      },
      architecture: Architecture.ARM_64,
      role: myRole,
      vpc: vpcConfig,
      securityGroups: [securityGroup],
      tracing: Tracing.ACTIVE,
    });

    cdk.Tags.of(nextjsLambda).add(
      "ApplicationService",
      "CS Channel: HE websites"
    );
    cdk.Tags.of(nextjsLambda).add("Classification", "unclassified");
    cdk.Tags.of(nextjsLambda).add("Name", serverFunctionName);
    cdk.Tags.of(nextjsLambda).add("ProjectName", "HE websites");

    const pgs_website_server_lambda_log = new logs.LogGroup(
      this,
      "pgs_website_server_lambda_1_log",
      {
        logGroupName: "/aws/lambda/dev-pgs-website-server-lambda",
        retention: logs.RetentionDays.FIVE_DAYS,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

    cdk.Tags.of(pgs_website_server_lambda_log).add(
      "ApplicationService",
      "CS Channel: HE websites"
    );
    cdk.Tags.of(pgs_website_server_lambda_log).add(
      "Classification",
      "unclassified"
    );
    cdk.Tags.of(pgs_website_server_lambda_log).add(
      "Name",
      "pgs_website_server_lambda_1_log"
    );
    cdk.Tags.of(pgs_website_server_lambda_log).add(
      "ProjectName",
      "HE websites"
    );

    const imageFunctionName = process.env.PGS_IMAGE_FN_LAMBDA_NAME || "";

    const myImageService = new MyLogGroupArm();

    const cloudwatchImagePolicyStatement: any = myImageService.setLogGroup(
      this.region,
      this.account,
      imageFunctionName
    );
    // Create the IAM policy
    const myImagePolicy = new Policy(this, "MyImagePolicy", {
      policyName: `${imageFunctionName}-permission`,
      statements: [cloudwatchImagePolicyStatement, ec2XrayPolicyStatement],
    });

    cdk.Tags.of(myImagePolicy).add(
      "ApplicationService",
      "CS Channel: HE websites"
    );
    cdk.Tags.of(myImagePolicy).add("Classification", "unclassified");
    cdk.Tags.of(myImagePolicy).add("Name", `${imageFunctionName}-permission`);
    cdk.Tags.of(myImagePolicy).add("ProjectName", "HE websites");

    // Create the IAM role
    const myImageRole = new Role(this, "MyImageRole", {
      roleName: `${imageFunctionName}-exec-role`,
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"), // or any other service that should assume this role
    });

    cdk.Tags.of(myImageRole).add(
      "ApplicationService",
      "CS Channel: HE websites"
    );
    cdk.Tags.of(myImageRole).add("Classification", "unclassified");
    cdk.Tags.of(myImageRole).add("Name", `${imageFunctionName}-exec-role`);
    cdk.Tags.of(myImageRole).add("ProjectName", "HE websites");

    // Attach the policy to the role
    myImagePolicy.attachToRole(myImageRole);

    //Create Lambda function for image-optimization
    const nextjsimageLambda = new Function(this, "NextjsImageLambda", {
      functionName: imageFunctionName,
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset("../.open-next/image-optimization-function"), // Directory containing your Next.js application code
      handler: "index.handler",
      timeout: cdk.Duration.seconds(30), // Adjust as needed
      memorySize: 1024, // Adjust as needed
      environment: {
        BUCKET_NAME: myBucket.bucketName, // Make S3 bucket name accessible in Lambda
        BUCKET_KEY_PREFIX: "_assets",
      },
      architecture: Architecture.ARM_64,
      role: myImageRole,
      vpc: vpcConfig,
      securityGroups: [securityGroup],
      tracing: Tracing.ACTIVE,
    });

    cdk.Tags.of(nextjsimageLambda).add(
      "ApplicationService",
      "CS Channel: HE websites"
    );
    cdk.Tags.of(nextjsimageLambda).add("Classification", "unclassified");
    cdk.Tags.of(nextjsimageLambda).add(
      "Name",
      "dev-pgs-website-image-optimizer-lambda"
    );
    cdk.Tags.of(nextjsimageLambda).add("ProjectName", "HE websites");

    const pgs_website_image_lambda_log = new logs.LogGroup(
      this,
      "pgs_website_image_lambda_1_log",
      {
        logGroupName: "/aws/lambda/dev-pgs-website-image-optimizer-lambda",
        retention: logs.RetentionDays.FIVE_DAYS,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );
    // Add tags to the log group
    cdk.Tags.of(pgs_website_image_lambda_log).add(
      "ApplicationService",
      "CS Channel: HE websites"
    );
    cdk.Tags.of(pgs_website_image_lambda_log).add(
      "Classification",
      "unclassified"
    );
    cdk.Tags.of(pgs_website_image_lambda_log).add(
      "Name",
      "pgs_website_image_lambda_1_log"
    );
    cdk.Tags.of(pgs_website_image_lambda_log).add("ProjectName", "HE websites");

    const nextjsLambdaUrl = nextjsLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.AWS_IAM,
      invokeMode: InvokeMode.BUFFERED,
    });
    /*Newly added configuration*/
    nextjsLambda.addPermission("AllowCloudFrontPrincipalServerLambda", {
      principal: new ServicePrincipal("cloudfront.amazonaws.com"),
      action: "lambda:InvokeFunctionUrl",
      sourceArn: `arn:aws:cloudfront::${
        cdk.Stack.of(this).account
      }:distribution/${process.env.PGS_CLOUD_FRONT_DISTRIBUTION_ID}`,
      sourceAccount: cdk.Aws.ACCOUNT_ID,
      functionUrlAuthType: FunctionUrlAuthType.AWS_IAM,
    });

    nextjsimageLambda.addPermission("AllowCloudFrontPrincipalImageLambda", {
      principal: new ServicePrincipal("cloudfront.amazonaws.com"),
      action: "lambda:InvokeFunctionUrl",
      sourceArn: `arn:aws:cloudfront::${
        cdk.Stack.of(this).account
      }:distribution/${process.env.PGS_CLOUD_FRONT_DISTRIBUTION_ID}`,
      sourceAccount: cdk.Aws.ACCOUNT_ID,
      functionUrlAuthType: FunctionUrlAuthType.AWS_IAM,
    });
    /*----------------------------------*/
    const nextjsImageLambdaUrl = nextjsimageLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.AWS_IAM,
      invokeMode: InvokeMode.BUFFERED,
    });

    new cdk.CfnOutput(this, "LambdaFn-url", {
      value: nextjsLambdaUrl.url,
    });

    new cdk.CfnOutput(this, "LambdaFn-image-url", {
      value: nextjsImageLambdaUrl.url,
    });
  }
}
