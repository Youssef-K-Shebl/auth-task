import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Domain } from "./DomainModel";

export enum RecordStatus {
  "ACTIVE" = "active",
  "DISABLED" = "disabled",
  "PENDING_UPDATE" = "pending_update", // TODO remove it
}

export enum RecordType {
  A = "A",
  AAAA = "AAAA",
  CNAME = "CNAME",
  MX = "MX",
  TXT = "TXT",
}
@Table({ tableName: "domain_records" })
export class DomainRecord extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  declare id: number;

  @ForeignKey(() => Domain)
  @Column(DataType.BIGINT.UNSIGNED)
  declare domain_id: number;

  @BelongsTo(() => Domain, { onDelete: "cascade", onUpdate: "cascade" })
  declare domain: Domain;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.ENUM(...Object.keys(RecordType)))
  declare type: RecordType;

  @Column(DataType.INTEGER)
  declare ttl: number;

  @Column(DataType.STRING)
  declare value: string;

  @Column(DataType.ENUM(...Object.keys(RecordStatus)))
  declare status: RecordStatus;

  @CreatedAt
  @Column({ type: DataType.DATE, field: "created_at" })
  declare created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_at" })
  declare updated_at: Date;
}
