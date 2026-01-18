import { body } from "express-validator";
import { DomainStatus } from "../../models/DomainModel";

export class CreateDomainRequest {
  declare name: string;
  declare status: DomainStatus;
  declare created_by: number;

  public static getValidationList() {
    return [
      body("name").isString().withMessage("Domain name must be a string"),
      body("status")
        .isIn(Object.values(DomainStatus))
        .withMessage(`Status must be one of ${Object.values(DomainStatus).join(", ")}`),
    ];
  }
}
