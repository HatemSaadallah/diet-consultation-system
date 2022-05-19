import { SNSClient } from '@aws-sdk/client-sns';
// Set the AWS Region.
const REGION = process.env.COGNITO_REGION;
// Create SNS service object.
const snsClient = new SNSClient({ region: REGION });
export { snsClient };
