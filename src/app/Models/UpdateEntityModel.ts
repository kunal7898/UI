import { ModelBase } from "./ModelBase";
import { AppFilters } from "../AppCommon/Controls/App.QueryFilters";

export namespace UpdateEntityModel{
    



 export class UpdateDataModel extends ModelBase<UpdateDataModel>{

   
    public EntityType : number;
    public EntityFieldId:string
    public Data:JSON;

 }

 


}