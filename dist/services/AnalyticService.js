"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticService = void 0;
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const spinal_env_viewer_plugin_group_manager_service_1 = require("spinal-env-viewer-plugin-group-manager-service");
const Analytic_1 = require("../Models/Analytic");
class AnalyticService {
    constructor() {
        this.nodeType = "Analytic";
        this.ANALYTIC_TO_GROUP_RELATION = "analyticHasGroup";
    }
    /**
       * This method creates a context of analytic
       * @param  {string} contextName - The analytic's context Name
       * @returns Promise
       */
    createContext(contextName) {
        return spinal_env_viewer_plugin_group_manager_service_1.default.createGroupContext(contextName, this.nodeType).then((context) => {
            const contextId = context.getId().get();
            return spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(contextId);
        });
    }
    /**
     * retrieves and returns all contexts of analytic
     * @returns Promise
     */
    getContexts(contextName) {
        return spinal_env_viewer_plugin_group_manager_service_1.default.getGroupContexts(this.nodeType).then((contexts) => {
            const argContexts = contexts.map(el => spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(el.id));
            if (typeof contextName === "undefined")
                return argContexts;
            return argContexts.find(context => context.name.get() === contextName);
        });
    }
    /**
     * This method creates an endpoint control category
     * @param  {string} contextId
     * @param  {string} categoryName
     * @param  {string} iconName
     * @returns Promise
     */
    createCategory(contextId, categoryName, iconName) {
        return spinal_env_viewer_plugin_group_manager_service_1.default.addCategory(contextId, categoryName, iconName).then((result) => {
            const nodeId = result.getId().get();
            return spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(nodeId);
        });
    }
    /**
     * get and return all categories in the context
     * @param  {string} nodeId
     * @returns Promise
     */
    getCategories(nodeId) {
        return spinal_env_viewer_plugin_group_manager_service_1.default.getCategories(nodeId).then((result) => {
            return result.map(el => spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(el.id.get()));
        });
    }
    /**
     * This method creates an endpoint control group
     * @param  {string} contextId
     * @param  {string} categoryId
     * @param  {string} groupName
     * @param  {string} groupColor
     * @returns Promise
     */
    createGroup(contextId, categoryId, groupName, groupColor) {
        return spinal_env_viewer_plugin_group_manager_service_1.default.addGroup(contextId, categoryId, groupName, groupColor).then((result) => {
            const nodeId = result.getId().get();
            return spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(nodeId);
        });
    }
    /**
     * get and return all groups in the category
     * @param  {string} nodeId
     * @returns Promise
     */
    getGroups(nodeId) {
        return spinal_env_viewer_plugin_group_manager_service_1.default.getGroups(nodeId).then((result) => {
            return result.map(el => spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(el.id.get()));
        });
    }
    /**
     * checks if the id passed in parameter is a group of analytic
     * @param  {string} id
     * @returns boolean
     */
    isAnalyticGroup(id) {
        const info = spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(id);
        const type = info.type.get();
        return type === `${this.nodeType}Group`;
    }
    /**
     * This function creates and links analytic node to group
     * @param  {string} contextId
     * @param  {string} groupId
     * @param  {IAnalytic} analyticInfo
     * @returns Promise
     */
    createAndLinkAnalytic(contextId, groupId, analyticInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = this.createAnalyticNode(analyticInfo);
            yield spinal_env_viewer_plugin_group_manager_service_1.default.linkElementToGroup(contextId, groupId, info.id.get());
            return info;
        });
    }
    /**
     * This function retrieves and return all analytics node of group
     * @param  {string} groupId
     * @returns Promise
     */
    getAnalyticNodes(groupId) {
        return spinal_env_viewer_plugin_group_manager_service_1.default.getElementsLinkedToGroup(groupId);
    }
    /**
     * creates and links analytic to group
     * @param  {string} contextId
     * @param  {string} analyticId
     * @param  {string} groupId
     * @returns Promise
     */
    linkGroupToAnalytic(contextId, analyticId, groupId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(analyticId, groupId, contextId, this.ANALYTIC_TO_GROUP_RELATION, spinal_env_viewer_graph_service_1.SPINAL_RELATION_PTR_LST_TYPE);
    }
    unLinkGroupToAnalytic(analyticId, groupId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.removeChild(analyticId, groupId, this.ANALYTIC_TO_GROUP_RELATION, spinal_env_viewer_graph_service_1.SPINAL_RELATION_PTR_LST_TYPE);
    }
    getGroupsLinked(analyticId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(analyticId, [this.ANALYTIC_TO_GROUP_RELATION]);
    }
    isLinkedToAnalytic(analyticId, nodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const children = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(analyticId, [this.ANALYTIC_TO_GROUP_RELATION]);
            const found = children.find(el => el.id.get() === nodeId);
            return typeof found !== "undefined";
        });
    }
    /**
     * This method creates and returns analyctic node info
     * @param  {IAnalytic} analyticInfo
     * @returns SpinalNodeRef
     */
    createAnalyticNode(analyticInfo) {
        analyticInfo.type = this.nodeType;
        const analyticModel = new Analytic_1.AnalyticModel(analyticInfo);
        const nodeId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode(analyticInfo, analyticModel);
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(nodeId);
    }
}
exports.default = AnalyticService;
exports.AnalyticService = AnalyticService;
//# sourceMappingURL=AnalyticService.js.map