import type { IRoutes } from "./routes.interface";

const express = require("express");

export abstract class AbstractExpressRoutes implements IRoutes {
  private m_baseEndpoint: string;
  private m_router: any;

  constructor(baseEndpoint: string) {
    if (baseEndpoint === null || baseEndpoint === void 0) {
      throw new Error(
        "Cannot build routes with null or undefined base endpoint string"
      );
    }

    this.m_baseEndpoint = baseEndpoint;
    this.m_router = express.Router();
  }

  public get baseEndpoint(): string {
    return this.m_baseEndpoint;
  }

  public get router(): any {
    return this.m_router;
  }
}
