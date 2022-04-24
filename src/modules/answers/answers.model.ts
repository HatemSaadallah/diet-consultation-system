import { AutoIncrement, Column, DataType, Model, PrimaryKey, Scopes, Table } from 'sequelize-typescript';

@Table({
    tableName: 'Answers',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

@Scopes(() => {
    return {
        basic: {
            attributes: {
                exclude: [
                    'updatedAt',
                    'createdAt',
                    'deletedAt',
                ],
            },
        }
    };
})

@Table({
    tableName: 'Answers',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

export class Answers extends Model<Answers> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.INTEGER)
    consultantId: number;

    @Column(DataType.STRING)
    questionId: number;

    @Column(DataType.STRING)
    answerTitle: string;

    @Column(DataType.STRING)
    answerDescription: string;

    @Column(DataType.STRING)
    answerRecommendations: string;

    @Column(DataType.DATE)
    isDraft: Date;

    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;

    @Column(DataType.DATE)
    deletedAt: Date;
}