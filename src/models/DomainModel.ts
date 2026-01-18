import {
  AutoIncrement,
  BeforeCreate,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { DomainRecord } from "./DomainRecordModel";
import { User } from "./UserModel";

export enum DomainStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  PENDING = "pending",
}
@Table({ tableName: "domains" })
export class Domain extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  declare id: number;

  @Column({ type: DataType.STRING, unique: true })
  declare name: string;

  @Column(DataType.ENUM(...Object.keys(DomainStatus)))
  declare status: DomainStatus;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT.UNSIGNED, field: "created_by", allowNull: true })
  declare created_by: number;

  @BelongsTo(() => User, { onDelete: "cascade", onUpdate: "cascade" })
  declare user: User;

  @CreatedAt
  @Column({ type: DataType.DATE, field: "created_at" })
  declare created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_at" })
  declare updated_at: Date;

  @HasMany(() => DomainRecord, { onDelete: "cascade", onUpdate: "cascade" })
  declare records: DomainRecord[];
}
