import { constants } from "http2";

export default class ExposableError extends Error {
  private readonly _statusCode: number;
  private readonly _details: any;

  public constructor(message: string);
  public constructor(message: string, statusCode: number);
  public constructor(message: string, statusCode: number, details: any);
  public constructor(message: string, statusCode?: number, details?: any) {
    super(message);
    this._statusCode = statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    this._details = details || null;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get details(): any {
    return this._details;
  }
}
