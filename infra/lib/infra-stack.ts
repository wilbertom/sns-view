import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as sns from "aws-cdk-lib/aws-sns";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as eventsources from "aws-cdk-lib/aws-lambda-event-sources";
import * as subscriptions from "aws-cdk-lib/aws-sns-subscriptions";

const codeLines = [
  `const util = require('util');`,
  `function handler(event, ctx, cb) {`,
  `  console.log({event: util.inspect(event, {depth: Infinity})});`,
  `  return cb(null, "hi");`,
  `}`,
  `exports.handler = handler;`,
];

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    {
      const topic = new sns.Topic(this, "topic", {});
      const queue = new sqs.Queue(this, "queue", {});
      const fn = new lambda.Function(this, "lambda", {
        runtime: lambda.Runtime.NODEJS_LATEST,
        code: lambda.Code.fromInline(codeLines.join("\n")),
        handler: `index.handler`,
      });

      // SNS -> SQS -> Lambda
      topic.addSubscription(new subscriptions.SqsSubscription(queue));
      fn.addEventSource(new eventsources.SqsEventSource(queue));

      new cdk.CfnOutput(this, "TopicARN", {
        value: topic.topicArn,
      });

      new cdk.CfnOutput(this, "FunctionName", {
        value: fn.functionName,
      });
    }
  }
}
