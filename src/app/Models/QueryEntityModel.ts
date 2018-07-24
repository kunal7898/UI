import { ModelBase } from "./ModelBase";
import { AppFilters } from "../AppCommon/Controls/App.QueryFilters";

export namespace QueryEntityModel{
    



 export class EntityMetaDataModel extends ModelBase<EntityMetaDataModel>{

   
   // Declartion
   public EntityType : number;
   public EntityId:string;
   public IsCatalogView :boolean;

 }

 export class EntityDataModel extends ModelBase<EntityMetaDataModel>{

   
  // Declartion
  public EntityType : number;
  public Filters:Array<AppFilters.FilterModel>;
  public IsCatalogView :boolean;
}


}