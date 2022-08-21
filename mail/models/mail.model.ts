import {Column, Model, Table, ForeignKey, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, BelongsToMany} from 'sequelize-typescript'



export interface IMailInput {
  from: string;
  to: string;
  subject: string;
  text: string;
}

@Table({tableName:"mail", timestamps:true, paranoid: true})
export class Mail extends Model<Mail, IMailInput> {
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
  public id!: number;

  @Column({type: DataType.STRING, allowNull: false})
  public from!: string;

  @Column({type: DataType.STRING, allowNull: false})
  public subject!: string;
  
  @Column({type: DataType.STRING, allowNull: false})
  public to!: string;
  
  @Column({type: DataType.STRING, allowNull: false})
  public text!: string;


  @CreatedAt
  public readonly createdAt!: Date;
  @UpdatedAt
  public readonly updatedAt!: Date;
  @DeletedAt
  public readonly deletedAt!: Date;
}
