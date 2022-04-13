import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    tableName: 'Questions',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

export class Questions extends Model<Questions> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    personName: string;

    @Column(DataType.STRING)
    questionTitle: string;

    @Column(DataType.STRING)
    questionDescription: string;

    @Column(DataType.INTEGER)
    numberOfAnswers: number;

    @Column(DataType.JSON)
    questionAnswers: string[];
    
    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;

    @Column(DataType.DATE)
    deletedAt: Date;
}