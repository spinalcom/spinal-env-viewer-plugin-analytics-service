
import { SpinalGraphService, SpinalNodeRef, SpinalNode, SPINAL_RELATION_PTR_LST_TYPE } from "spinal-env-viewer-graph-service";
import groupManagerService from "spinal-env-viewer-plugin-group-manager-service";
import { AnalyticModel } from "../Models/Analytic";
import { IAnalytic } from "../Interfaces/IAnalytic";


export default class AnalyticService {
   public nodeType: string = "Analytic";
   public ANALYTIC_TO_GROUP_RELATION: string = "analyticHasGroup";

   constructor() { }

   /**
      * This method creates a context of analytic
      * @param  {string} contextName - The analytic's context Name
      * @returns Promise
      */
   public createContext(contextName: string): Promise<SpinalNodeRef> {
      return groupManagerService.createGroupContext(contextName, this.nodeType).then((context) => {
         const contextId = context.getId().get();
         return SpinalGraphService.getInfo(contextId);
      })
   }


   /**
    * retrieves and returns all contexts of analytic
    * @returns Promise
    */
   public getContexts(contextName?: string): Promise<Array<SpinalNodeRef>> {
      return groupManagerService.getGroupContexts(this.nodeType).then((contexts) => {
         const argContexts = contexts.map(el => SpinalGraphService.getInfo(el.id));
         if (typeof contextName === "undefined") return argContexts;
         return argContexts.find(context => context.name.get() === contextName)
      })
   }

   /**
    * This method creates an endpoint control category
    * @param  {string} contextId
    * @param  {string} categoryName
    * @param  {string} iconName
    * @returns Promise
    */
   public createCategory(contextId: string, categoryName: string, iconName: string): Promise<SpinalNodeRef> {
      return groupManagerService.addCategory(contextId, categoryName, iconName).then((result) => {
         const nodeId = result.getId().get();
         return SpinalGraphService.getInfo(nodeId);
      })
   }


   /**
    * get and return all categories in the context
    * @param  {string} nodeId
    * @returns Promise
    */
   public getCategories(nodeId: string): Promise<Array<SpinalNodeRef>> {
      return groupManagerService.getCategories(nodeId).then((result) => {
         return result.map(el => SpinalGraphService.getInfo(el.id.get()));
      })
   }


   /**
    * This method creates an endpoint control group
    * @param  {string} contextId
    * @param  {string} categoryId
    * @param  {string} groupName
    * @param  {string} groupColor
    * @returns Promise
    */
   public createGroup(contextId: string, categoryId: string, groupName: string, groupColor: string): Promise<SpinalNodeRef> {
      return groupManagerService.addGroup(contextId, categoryId, groupName, groupColor).then((result) => {
         const nodeId = result.getId().get();
         return SpinalGraphService.getInfo(nodeId);
      })
   }


   /**
    * get and return all groups in the category
    * @param  {string} nodeId
    * @returns Promise
    */
   public getGroups(nodeId: string): Promise<Array<SpinalNodeRef>> {
      return groupManagerService.getGroups(nodeId).then((result) => {
         return result.map(el => SpinalGraphService.getInfo(el.id.get()));
      })
   }


   /**
    * checks if the id passed in parameter is a group of analytic
    * @param  {string} id
    * @returns boolean
    */
   public isAnalyticGroup(id: string): boolean {
      const info = SpinalGraphService.getInfo(id);
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
   public async createAndLinkAnalytic(contextId: string, groupId: string, analyticInfo: IAnalytic): Promise<SpinalNodeRef> {
      const info = this.createAnalyticNode(analyticInfo);
      await groupManagerService.linkElementToGroup(contextId, groupId, info.id.get());
      return info
   }


   /**
    * This function retrieves and return all analytics node of group
    * @param  {string} groupId
    * @returns Promise
    */
   public getAnalyticNodes(groupId): Promise<Array<SpinalNodeRef>> {
      return groupManagerService.getElementsLinkedToGroup(groupId);
   }

   /**
    * creates and links analytic to group
    * @param  {string} contextId
    * @param  {string} analyticId
    * @param  {string} groupId
    * @returns Promise
    */
   public linkGroupToAnalytic(contextId: string, analyticId: string, groupId: string): Promise<SpinalNode<any>> {
      return SpinalGraphService.addChildInContext(analyticId, groupId, contextId, this.ANALYTIC_TO_GROUP_RELATION, SPINAL_RELATION_PTR_LST_TYPE);
   }

   public unLinkGroupToAnalytic(analyticId: string, groupId: string): Promise<boolean> {
      return SpinalGraphService.removeChild(analyticId, groupId, this.ANALYTIC_TO_GROUP_RELATION, SPINAL_RELATION_PTR_LST_TYPE);
   }


   public getGroupsLinked(analyticId: string): Promise<Array<SpinalNodeRef>> {
      return SpinalGraphService.getChildren(analyticId, [this.ANALYTIC_TO_GROUP_RELATION]);
   }


   public async isLinkedToAnalytic(analyticId: string, nodeId: string): Promise<boolean> {
      const children = await SpinalGraphService.getChildren(analyticId, [this.ANALYTIC_TO_GROUP_RELATION]);
      const found = children.find(el => el.id.get() === nodeId);
      return typeof found !== "undefined";
   }




   /**
    * This method creates and returns analyctic node info
    * @param  {IAnalytic} analyticInfo
    * @returns SpinalNodeRef
    */
   private createAnalyticNode(analyticInfo: IAnalytic): SpinalNodeRef {
      analyticInfo.type = this.nodeType;

      const analyticModel = new AnalyticModel(analyticInfo);
      const nodeId = SpinalGraphService.createNode(analyticInfo, analyticModel);
      return SpinalGraphService.getInfo(nodeId);
   }

}

export { AnalyticService }