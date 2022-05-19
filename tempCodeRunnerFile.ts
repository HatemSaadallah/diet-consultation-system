// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'us-east-1' });

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const params = {
  // Remove DelaySeconds parameter and value for FIFO queues
  MessageAttributes: {
    Title: {
      DataType: 'String',
      StringValue: 'The Whistler',
    },
    Author: {
      DataType: 'String',
      StringValue: 'John Grisham',
    },
    WeeksOn: {
      DataType: 'Number',
      StringValue: '6',
    },
  },
  MessageBody:
    'Information about current NY Times fiction bestseller for week of 12/11/2016.',
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageGroupId: "Group1",  // Required for FIFO queues
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/259079320262/sqs-fifo.fifo',
  MessageGroupId: 'Group1',
  MessageDeduplicationId: 'TheWhistler',
};

sqs.sendMessage(params, function (err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data.MessageId);
  }
});
