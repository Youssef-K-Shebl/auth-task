import { Expose } from "class-transformer";

export class GetDomainsResponse {
  @Expose() declare id: number;
  @Expose() declare name: string;
  @Expose() declare status: string;
}
