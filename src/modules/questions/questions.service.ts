import { Inject, Injectable, CACHE_MANAGER} from "@nestjs/common";
import { REPOSITORIES } from "src/common/constants";
import { GetQuestionsDto } from "./dto/get-questions.dto";
import { Questions } from "./questions.model";
import { Cache } from "cache-manager";
// import { Consultants } from "../consultants/consultants.model";

@Injectable()
export class QuestionsService {
    constructor(
        @Inject(REPOSITORIES.QUESTION_REPOSITORY)
        private questionRepository: typeof Questions,

        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) { }

    getQuestions(options: GetQuestionsDto) {
        let { size, page } = options;
        size = size || 5;
        page = page || 1;


        return this.questionRepository.findAll({
            order: [
                ['number_of_answers', 'ASC'],
                ['created_at', 'DESC']
            ],
            limit: size,
            offset: (page - 1) * size,
        });
    }
    getQuestionById(id: number) {
        return this.questionRepository.findOne({
            where: {
                id
            }
        });
    }

    

}