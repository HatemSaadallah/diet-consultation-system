import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORIES } from "src/common/constants";
import { GetQuestionsDto } from "../consultants/dto/get-questions.dto";
import { Questions } from "./questions.model";

@Injectable()
export class QuestionsService {
    constructor(
        @Inject(REPOSITORIES.QUESTION_REPOSITORIES)
        private questionRepository: typeof Questions
    ) { }

    getQuestions(options: GetQuestionsDto) {
        // Add pagination
        let { size, page } = options;
        size = size || 5;
        page = page || 1;
        
        
        return this.questionRepository.findAll({
          order: [['number_of_answers', 'ASC']],
          limit: size,
          offset: (page - 1) * size,
        });
      }

}