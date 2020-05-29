"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractExpressRoutes = void 0;
const express = require("express");
class AbstractExpressRoutes {
    constructor(baseEndpoint) {
        if (baseEndpoint === null || baseEndpoint === void 0) {
            throw new Error("Cannot build routes with null or undefined base endpoint string");
        }
        this.m_baseEndpoint = baseEndpoint;
        this.m_router = express.Router();
    }
    get baseEndpoint() {
        return this.m_baseEndpoint;
    }
    get router() {
        return this.m_router;
    }
}
exports.AbstractExpressRoutes = AbstractExpressRoutes;
//# sourceMappingURL=expressRoutes.js.map