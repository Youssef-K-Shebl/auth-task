import { Expose } from "class-transformer";

export class UpdateDomainRecordResponse {
  @Expose() declare id: number;
  @Expose() declare name: string;
  @Expose() declare type: string;
  @Expose() declare ttl: number;
  @Expose() declare status: string;
  @Expose() declare value: string;
  @Expose() declare domain_id: number;
}
