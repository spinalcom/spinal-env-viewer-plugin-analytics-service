import { IAnalytic } from "./Interfaces/IAnalytic";
import { AnalyticModel } from "./Models/Analytic";
import { AnalyticService } from "./services/AnalyticService";
declare const spinalAnalyticService: AnalyticService;
export { spinalAnalyticService, IAnalytic, AnalyticModel };
export default spinalAnalyticService;
