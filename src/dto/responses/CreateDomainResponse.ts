import { Expose } from "class-transformer";

export class CreateDomainResponse {
  @Expose() declare id: number;
  @Expose() declare name: string;
  @Expose() declare status: string;
}
