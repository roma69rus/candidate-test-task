import {Column, Model, Table, ForeignKey, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, BelongsToMany} from 'sequelize-typescript'



export interface INoteInput {
  text: string;
  owner: string;
}

@Table({tableName:"note", timestamps:true, paranoid: true})
export class Note extends Model<Note, INoteInput> {
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
  public id!: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  public text!: string;

  @Column({type: DataType.STRING, allowNull: false})
  public owner!: string;


  @CreatedAt
  public readonly createdAt!: Date;
  @UpdatedAt
  public readonly updatedAt!: Date;
  @DeletedAt
  public readonly deletedAt!: Date;
}
