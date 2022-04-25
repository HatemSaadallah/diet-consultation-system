import { AutoIncrement, Column, DataType, Model, PrimaryKey, Scopes, Table } from 'sequelize-typescript';

@Table({
    tableName: 'Users',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

@Scopes(() => {
    return {
        no_password: {
            attributes: {
                exclude: [
                    'password',
                ],
            },
        },
        basic: {
            attributes: {
                exclude: [
                    'updatedAt',
                    'createdAt',
                    'updatedBy',
                    'createdBy',
                    'deletedAt',
                ],
            },
        }
    };
})


export class Users extends Model<Users> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    email: string;

    @Column(DataType.STRING)
    username: string;

    @Column(DataType.STRING)
    password: string;

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