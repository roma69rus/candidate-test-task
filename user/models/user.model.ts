import {Column, Model, Table, ForeignKey, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, BelongsToMany} from 'sequelize-typescript'



export interface IUserInput {
  email: string;
  password: string;
}

@Table({tableName:"user", timestamps:true, paranoid: true})
export class User extends Model<User, IUserInput> {
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
  public id!: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  public email!: string;

  @Column({type: DataType.STRING, allowNull: false})
  public password!: string;


  @CreatedAt
  public readonly createdAt!: Date;
  @UpdatedAt
  public readonly updatedAt!: Date;
  @DeletedAt
  public readonly deletedAt!: Date;
}
