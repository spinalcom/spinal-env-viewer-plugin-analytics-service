import { SpinalNodeRef, SpinalNode } from "spinal-env-viewer-graph-service";
import { IAnalytic } from "../Interfaces/IAnalytic";
export default class AnalyticService {
    nodeType: string;
    ANALYTIC_TO_GROUP_RELATION: string;
    constructor();
    /**
       * This method creates a context of analytic
       * @param  {string} contextName - The analytic's context Name
       * @returns Promise
       */
    createContext(contextName: string): Promise<SpinalNodeRef>;
    /**
     * retrieves and returns all contexts of analytic
     * @returns Promise
     */
    getContexts(contextName?: string): Promise<Array<SpinalNodeRef>>;
    /**
     * This method creates an endpoint control category
     * @param  {string} contextId
     * @param  {string} categoryName
     * @param  {string} iconName
     * @returns Promise
     */
    createCategory(contextId: string, categoryName: string, iconName: string): Promise<SpinalNodeRef>;
    /**
     * get and return all categories in the context
     * @param  {string} nodeId
     * @returns Promise
     */
    getCategories(nodeId: string): Promise<Array<SpinalNodeRef>>;
    /**
     * This method creates an endpoint control group
     * @param  {string} contextId
     * @param  {string} categoryId
     * @param  {string} groupName
     * @param  {string} groupColor
     * @returns Promise
     */
    createGroup(contextId: string, categoryId: string, groupName: string, groupColor: string): Promise<SpinalNodeRef>;
    /**
     * get and return all groups in the category
     * @param  {string} nodeId
     * @returns Promise
     */
    getGroups(nodeId: string): Promise<Array<SpinalNodeRef>>;
    /**
     * checks if the id passed in parameter is a group of analytic
     * @param  {string} id
     * @returns boolean
     */
    isAnalyticGroup(id: string): boolean;
    /**
     * This function creates and links analytic node to group
     * @param  {string} contextId
     * @param  {string} groupId
     * @param  {IAnalytic} analyticInfo
     * @returns Promise
     */
    createAndLinkAnalytic(contextId: string, groupId: string, analyticInfo: IAnalytic): Promise<SpinalNodeRef>;
    /**
     * This function retrieves and return all analytics node of group
     * @param  {string} groupId
     * @returns Promise
     */
    getAnalyticNodes(groupId: any): Promise<Array<SpinalNodeRef>>;
    /**
     * creates and links analytic to group
     * @param  {string} contextId
     * @param  {string} analyticId
     * @param  {string} groupId
     * @returns Promise
     */
    linkGroupToAnalytic(contextId: string, analyticId: string, groupId: string): Promise<SpinalNode<any>>;
    unLinkGroupToAnalytic(analyticId: string, groupId: string): Promise<boolean>;
    getGroupsLinked(analyticId: string): Promise<Array<SpinalNodeRef>>;
    isLinkedToAnalytic(analyticId: string, nodeId: string): Promise<boolean>;
    /**
     * This method creates and returns analyctic node info
     * @param  {IAnalytic} analyticInfo
     * @returns SpinalNodeRef
     */
    private createAnalyticNode;
}
export { AnalyticService };
