export default class SuccessResponse {
  private readonly success: boolean;
  private readonly message: string;
  private readonly data: any;

  public constructor(message: string = "", data: any = null) {
    this.success = true;
    this.message = message;
    this.data = data;
  }

  public static of(message: string, data: any): SuccessResponse;
  public static of(message: string): SuccessResponse;
  public static of(data: any): SuccessResponse;
  public static of(): SuccessResponse;

  public static of(messageORData?: string | any, data?: any): SuccessResponse {
    if (typeof messageORData === "string") {
      return new SuccessResponse(messageORData, data);
    } else {
      return new SuccessResponse("", messageORData);
    }
  }
}
