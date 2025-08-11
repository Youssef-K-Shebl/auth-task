import { param } from "express-validator";

export class DeleteRecordRequest {
  public static getValidationList() {
    return [
      param("domainId").isString().withMessage("Domain ID must be a string"),
      param("recordId").isString().withMessage("Record ID must be a string"),
    ];
  }
}
