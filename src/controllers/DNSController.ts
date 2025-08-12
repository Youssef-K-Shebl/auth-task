import { NextFunction, Request, Response } from "express";
import SuccessResponse from "../dto/responses/SuccessResponse";
import { DNSService } from "../services/DNSService";
import { CreateDomainRequest } from "../dto/requests/CreateDomainRequest";
import { constants } from "http2";
import { CreateRecordRequest } from "../dto/requests/CreateRecordRequest";
import { UpdateRecordRequest } from "../dto/requests/UpdateRecordRequest";
import { DNSConfig } from "../config/DNSConfig";
import { GetDomainsResponse } from "../dto/responses/GetDomainsResponse";
import { plainToInstance } from "class-transformer";
import { CreateDomainResponse } from "../dto/responses/CreateDomainResponse";
import { CreateDomainRecordResponse } from "../dto/responses/CreateDomainRecordResponse";
import { GetDomainsRecordResponse } from "../dto/responses/GetDomainsRecordResponse";
import { UpdateDomainRecordResponse } from "../dto/responses/UpdateDomainRecordResponse";

export class DNSController {
  private readonly dnsService: DNSService;

  constructor() {
    this.dnsService = new DNSService(new DNSConfig());
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryResult = await this.dnsService.getAll((req as any).user.id);
      const result: GetDomainsResponse[] = plainToInstance(GetDomainsResponse, queryResult, {
        excludeExtraneousValues: true,
      });

      res.status(200).json(SuccessResponse.of("Get all successful", result));
    } catch (error: any) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createDomainBody: CreateDomainRequest = { ...req.body, created_by: (req as any).user.id };
      const result = plainToInstance(CreateDomainResponse, await this.dnsService.create(createDomainBody), {
        excludeExtraneousValues: true,
      });
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
      const createRecordBody: CreateRecordRequest = { ...req.body, created_by: (req as any).user.id };
      const result = await this.dnsService.createRecord(createRecordBody, Number(domainId));
      res
        .status(200)
        .json(
          SuccessResponse.of(
            "Create record successful",
            plainToInstance(CreateDomainRecordResponse, result, { excludeExtraneousValues: true })
          )
        );
    } catch (error: any) {
      next(error);
    }
  };

  getRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domainId = req.params.domainId as string;
      const result = await this.dnsService.getRecords(Number(domainId));
      res
        .status(200)
        .json(
          SuccessResponse.of(
            "Get records successful",
            plainToInstance(GetDomainsRecordResponse, result, { excludeExtraneousValues: true })
          )
        );
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
      res
        .status(200)
        .json(
          SuccessResponse.of(
            "Update record successful",
            plainToInstance(UpdateDomainRecordResponse, result, { excludeExtraneousValues: true })
          )
        );
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
