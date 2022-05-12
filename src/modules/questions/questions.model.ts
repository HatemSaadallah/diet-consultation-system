import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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
  title: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.INTEGER)
  numberOfAnswers: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.INTEGER)
  createdBy: number;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.INTEGER)
  updatedBy: number;

  @Column(DataType.DATE)
  deletedAt: Date;

  @Column(DataType.INTEGER)
  deletedBy: number;
}
