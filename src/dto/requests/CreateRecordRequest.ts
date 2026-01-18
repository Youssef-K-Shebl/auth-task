import { body, param } from "express-validator";
import { RecordStatus, RecordType } from "../../models/DomainRecordModel";

export class CreateRecordRequest {
  declare name: string;
  declare type: RecordType;
  declare ttl: number;
  declare status: RecordStatus;
  declare value: string;
  declare created_by: number;

  public static getValidationList() {
    return [
      param("domainId").isString().withMessage("Domain ID must be a string"),
      body("name").isString().withMessage("Record name must be a string"),
      body("type").isIn(Object.values(RecordType)),
      body("ttl").isInt({ min: 0 }).withMessage("TTL must be a non-negative integer"),
      body("status").isIn(Object.values(RecordStatus)).withMessage("Status must be one of the valid statuses"),
      body("value").isString().withMessage("Record value must be a string"),
    ];
  }
}
