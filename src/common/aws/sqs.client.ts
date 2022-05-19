import { SQSClient } from '@aws-sdk/client-sqs';
// Set the AWS Region.
const REGION = process.env.COGNITO_REGION;
// Create SNS service object.
const sqsClient = new SQSClient({ region: REGION });
export { sqsClient };
