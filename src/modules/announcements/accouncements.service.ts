import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from '../users/dto/createAnnouncement.dto';
import { PublishCommand } from '@aws-sdk/client-sns';
import { snsClient } from '../../common/aws/sns.client';

@Injectable()
export class AnnouncementsService {
  async announceMessage(createAnnouncementDto: CreateAnnouncementDto) {
    const params = {
      Message: createAnnouncementDto.bodyOfAnnouncement,
      TopicArn: 'arn:aws:sns:us-east-1:259079320262:diet-topic',
    };

    try {
      const data = await snsClient.send(new PublishCommand(params));
      return data; // For unit tests.
    } catch (err) {
      console.log(err);
    }
    return 'ERROR';
  }
}
