import { Request, Response } from "express";
export declare class AuthController {
    private readonly authService;
    constructor();
    signup: (req: Request, res: Response) => void;
    login: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
}
//# sourceMappingURL=authController.d.ts.map