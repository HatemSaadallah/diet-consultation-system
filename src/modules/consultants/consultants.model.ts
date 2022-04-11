import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    tableName: 'Consultants',
    timestamps: true,
    underscored: true,
    paranoid: true,
    schema: 'diet_consultation',
})

export class Consultants extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    email: string;

    @Column(DataType.STRING)
    username: string;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    middleName: string;

    @Column(DataType.STRING)
    lastName: string;

    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;

    @Column(DataType.STRING)
    createdBy: number;

    @Column(DataType.STRING)
    updatedBy: number;
}