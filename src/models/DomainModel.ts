import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { DomainRecord } from "./DomainRecordModel";
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

  @CreatedAt
  @Column({ type: DataType.DATE, field: "created_at" })
  declare created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_at" })
  declare updated_at: Date;

  @HasMany(() => DomainRecord, { onDelete: "cascade", onUpdate: "cascade" })
  declare records: DomainRecord[];
}
