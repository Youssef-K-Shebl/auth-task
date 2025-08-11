import { NextFunction, Request, Response } from "express";
import SuccessResponse from "../dto/responses/SuccessResponse";
import { DNSService } from "../services/DNSService";
import { CreateDomainRequest } from "../dto/requests/CreateDomainRequest";
import { constants } from "http2";
import { CreateRecordRequest } from "../dto/requests/CreateRecordRequest";
import { UpdateRecordRequest } from "../dto/requests/UpdateRecordRequest";
import { IDNSConfig } from "../interfaces/IDNSConfig";
import { DNSConfig } from "../config/DNSConfig";

export class DNSController {
  private readonly dnsService: DNSService;

  constructor() {
    this.dnsService = new DNSService(new DNSConfig());
  }

  // Example method
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.dnsService.getAll();
      res.status(200).json(SuccessResponse.of("Get all successful", result));
    } catch (error: any) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createDomainBody: CreateDomainRequest = req.body;
      const result = await this.dnsService.create(createDomainBody);
      res.status(200).json(SuccessResponse.of("Create successful", result));
    } catch (error: any) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domainId = req.params.domainId as string;
      await this.dnsService.delete(domainId);
      res.status(constants.HTTP_STATUS_NO_CONTENT).json(SuccessResponse.of("Delete successful"));
    } catch (error: any) {
      next(error);
    }
  };

  createRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domainId = req.params.domainId as string;
      const createRecordBody: CreateRecordRequest = req.body;
      const result = await this.dnsService.createRecord(createRecordBody, Number(domainId));
      res.status(200).json(SuccessResponse.of("Create record successful", result));
    } catch (error: any) {
      next(error);
    }
  };

  getRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domainId = req.params.domainId as string;
      const result = await this.dnsService.getRecords(Number(domainId));
      res.status(200).json(SuccessResponse.of("Get records successful", result));
    } catch (error: any) {
      next(error);
    }
  };

  updateRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domainId = req.params.domainId as string;
      const recordId = req.params.recordId as string;
      const updateRecordBody: UpdateRecordRequest = req.body;
      const result = await this.dnsService.updateRecord(updateRecordBody, Number(domainId), Number(recordId));
      res.status(200).json(SuccessResponse.of("Update record successful", result));
    } catch (error: any) {
      next(error);
    }
  };

  deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domainId = req.params.domainId as string;
      const recordId = req.params.recordId as string;
      const result = await this.dnsService.deleteRecord(Number(domainId), Number(recordId));
      res.status(constants.HTTP_STATUS_NO_CONTENT).json(SuccessResponse.of("Delete record successful"));
    } catch (error: any) {
      next(error);
    }
  };
}
