import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Frontend } from "./constructs/frontend";
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
  ObjectOwnership,
} from "aws-cdk-lib/aws-s3";

export class ServerlessWebappStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, {
      description: `${id}WebappStack`,
      ...props,
    });

    const accessLogBucket = new Bucket(this, `${id}AccessLog`, {
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      objectOwnership: ObjectOwnership.OBJECT_WRITER,
      autoDeleteObjects: true,
    });

    const frontend = new Frontend(this, `${id}Frontend`, {
      accessLogBucket,
    });
    new CfnOutput(this, `${id}DomainName`, {
      value: `https://${frontend.cloudFrontWebDistribution.distributionDomainName}`,
    });
  }
}
