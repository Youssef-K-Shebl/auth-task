import bcrypt from "bcrypt";
import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare profileImage: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: "created_at" })
  declare created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_at" })
  declare updated_at: Date;

  @BeforeCreate
  static async asynchashPassword(user: User) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
}
