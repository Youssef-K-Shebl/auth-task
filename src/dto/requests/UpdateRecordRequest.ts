import { body, param } from "express-validator";
import { RecordStatus, RecordType } from "../../models/DomainRecordModel";

export class UpdateRecordRequest {
  declare name: string;
  declare type: RecordType;
  declare ttl: number;
  declare status: RecordStatus;
  declare value: string;

  public static getValidationList() {
    return [
      param("domainId").isString().withMessage("Domain ID must be a string"),
      param("recordId").isString().withMessage("Record ID must be a string"),
      body("name").optional().isString().withMessage("Record name must be a string"),
      body("type").optional().isIn(Object.values(RecordType)),
      body("ttl").optional().isInt({ min: 0 }).withMessage("TTL must be a non-negative integer"),
      body("status")
        .optional()
        .isIn(Object.values(RecordStatus))
        .withMessage("Status must be one of the valid statuses"),
      body("value").optional().isString().withMessage("Record value must be a string"),
    ];
  }
}
