// Import required AWS SDK clients and commands for Node.js
import {
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';
import { sqsClient } from './src/common/aws/sqs.client';

// Set the parameters
const queueURL =
  'https://sqs.us-east-1.amazonaws.com/259079320262/sqs-fifo.fifo'; //SQS_QUEUE_URL; e.g., 'https://sqs.REGION.amazonaws.com/ACCOUNT-ID/QUEUE-NAME'
const params = {
  AttributeNames: ['SentTimestamp'],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ['All'],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

const run = async () => {
  try {
    const data = await sqsClient.send(new ReceiveMessageCommand(params));
    if (data.Messages) {
      const deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      try {
        const data = await sqsClient.send(
          new DeleteMessageCommand(deleteParams),
        );
        console.log('Message deleted', data);
      } catch (err) {
        console.log('Error', err);
      }
    } else {
      console.log('No messages to delete');
    }
    return data; // For unit tests.
  } catch (err) {
    console.log('Receive Error', err);
  }
};
run();
