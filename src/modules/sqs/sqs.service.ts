import { Injectable } from '@nestjs/common';
import { sqsClient } from 'src/common/aws/sqs.client';
// Import AWS
import AWS = require('aws-sdk');
@Injectable()
export class SQSService {
  constructor() {}
  sqs = new AWS.SQS({
    apiVersion: '2012-11-05',
    region: 'us-east-1',
  });
  createQueue(queueName: string) {
    // Return promise
    return new Promise((resolve, reject) => {
      // Create params
      this.sqs.createQueue(
        {
          QueueName: queueName,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  listQueues() {
    // Return promise
    return new Promise((resolve, reject) => {
      // Create params
      this.sqs.listQueues((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  receiveMessage() {
    // Return promise
    return new Promise((resolve, reject) => {
      // Create params
      this.sqs.receiveMessage(
        {
          QueueUrl:
            'https://sqs.us-east-1.amazonaws.com/259079320262/sqs-fifo.fifo',
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  deleteMessage(message) {
    // Return promise
    return new Promise((resolve, reject) => {
      // Create params
      this.sqs.deleteMessage(
        {
          QueueUrl:
            'https://sqs.us-east-1.amazonaws.com/259079320262/sqs-fifo.fifo',
          ReceiptHandle: message.ReceiptHandle,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }
}
