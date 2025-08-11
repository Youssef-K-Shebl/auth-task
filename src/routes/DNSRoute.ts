import express from "express";
import { DNSController } from "../controllers/DNSController";
import { validate } from "../middlewares/ValidateMiddleware";
import { CreateDomainRequest } from "../dto/requests/CreateDomainRequest";
import { param } from "express-validator";
import { CreateRecordRequest } from "../dto/requests/CreateRecordRequest";
import { UpdateRecordRequest } from "../dto/requests/UpdateRecordRequest";
import { DeleteRecordRequest } from "../dto/requests/DeleteRecordRequest";

export const router = express.Router();

const controller = new DNSController();
router.get("", controller.getAll);

router.post("", CreateDomainRequest.getValidationList(), validate, controller.create);

router.delete("/:domainId", param("domainId").isString(), validate, controller.delete);

router.get("/:domainId/record", param("domainId").isString(), validate, controller.getRecords);

router.post("/:domainId/record", CreateRecordRequest.getValidationList(), validate, controller.createRecord);

router.patch("/:domainId/record/:recordId", UpdateRecordRequest.getValidationList(), validate, controller.updateRecord);

router.delete(
  "/:domainId/record/:recordId",
  DeleteRecordRequest.getValidationList(),
  validate,
  controller.deleteRecord
);
