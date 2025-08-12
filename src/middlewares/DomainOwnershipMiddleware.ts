import { NextFunction, Request, Response } from "express";
import { Domain } from "../models/DomainModel";
import ExposableError from "../error/ExposableError";
import { DomainRecord } from "../models/DomainRecordModel";

export const validateDomainOwnership = async (req: Request, res: Response, next: NextFunction) => {
  if (req.params.domainId) {
    const domain = await Domain.findOne({ where: { id: req.params.domainId, created_by: (req as any).user.id } });
    if (!domain) {
      next(new ExposableError("Domain not found", 404));
    }
  }

  if (req.params.recordId) {
    const record = await DomainRecord.findOne({ where: { id: req.params.recordId, created_by: (req as any).user.id } });
    if (!record) {
      next(new ExposableError("Record not found", 404));
    }
  }

  next();
};
