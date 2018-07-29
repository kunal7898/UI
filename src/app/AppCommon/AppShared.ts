import { AppControl } from "./Controls/App.Controls";
import { MetaDataModel } from "../Models/MetaDataModel";
import { MetaDataGridModel } from "../Models/MetaDataGridModel";

export namespace AppShared{

    export class CurrentSelection{
        EntityType:number;
        ViewIndex:string;
    }

    export class CurrentForm{
        EntityType: number;
        ViewIndex : string;
        EntityId:string;
        constructor(entityType:number,viewIndex:string,entityId:string){
            this.EntityType =  entityType;
            this.ViewIndex =  viewIndex;
            this.EntityId = entityId;
        }
    }

    export class CurrentChildGrid
    {
        Columns:any;
        Data:Array<any>;
        Metadata:AppControl.FormMetadata;
    }

    export class RelationData{
        public RelationName:string;
        public Data : Array<MetaDataGridModel>;
    }
}