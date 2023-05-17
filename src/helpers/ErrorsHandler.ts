import { NextApiResponse } from "next";
import { ResponseHandler } from "./ResponseHandler";

export class ErrorsHandler {
  public res: NextApiResponse<any>;

  constructor(res: NextApiResponse<any>) {
    this.res = res;
  }

  missingParameter(parameter: string) {
    return ResponseHandler.buildResponse(
      this.res,
      400,
      `Missing parameter: ${parameter}`
    );
  }

  internalServerError() {
    return ResponseHandler.buildResponse(
      this.res,
      500,
      `Internal server error`
    );
  }

  invalidParameterValue(parameter: string, value: any) {
    return ResponseHandler.buildResponse(
      this.res,
      400,
      `Invalid ${parameter} value: ${value}`
    );
  }
}
