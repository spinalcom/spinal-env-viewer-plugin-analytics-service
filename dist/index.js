"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticModel = exports.spinalAnalyticService = void 0;
const Analytic_1 = require("./Models/Analytic");
Object.defineProperty(exports, "AnalyticModel", { enumerable: true, get: function () { return Analytic_1.AnalyticModel; } });
const AnalyticService_1 = require("./services/AnalyticService");
const globalRoot = typeof window === "undefined" ? global : window;
const spinalAnalyticService = new AnalyticService_1.AnalyticService();
exports.spinalAnalyticService = spinalAnalyticService;
if (typeof globalRoot.spinal === 'undefined')
    globalRoot.spinal = {};
if (typeof globalRoot.spinal.spinalAnalyticService === 'undefined') {
    globalRoot.spinal.spinalAnalyticService = spinalAnalyticService;
}
if (typeof globalRoot.spinal.spinalAnalyticService === 'undefined') {
    globalRoot.spinal.spinalAnalyticService = spinalAnalyticService;
}
exports.default = spinalAnalyticService;
//# sourceMappingURL=index.js.map