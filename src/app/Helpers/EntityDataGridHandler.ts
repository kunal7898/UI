import { Injectable } from "@angular/core";
import { BaseHandler } from "./BaseHandler";
import { CataLogEntityDataGridService } from "../Services/EntityDataGridService";
import { AppShared } from "../AppCommon/AppShared";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AppRequest } from "../Models/Apprequest";
import { MetaDataModel } from "../Models/MetaDataModel";
import { MetaDataGridModel } from "../Models/MetaDataGridModel";
import { GridDataType } from "../AppCommon/App.Enums";

@Injectable()
export class CatalogEntityDataGridHandler  extends BaseHandler{
    response : any;
    constructor(public CatalogGridService : CataLogEntityDataGridService){
        super();
        }

        public LoadColumnsDynamic(CurrentSelection :  MetaDataModel.EntityMetaDataModel):Array<MetaDataGridModel>{

            let metadataRequest =  new AppRequest.MetadataRequestMessage(CurrentSelection);
            let response = this.CatalogGridService.LoadColumns(metadataRequest.metadataRequest);
            return response;
            
            }


            public ParseDataType(Type:GridDataType){
                switch(Type){
                    case GridDataType.Checkbox:
                    return "boolean";
                    case GridDataType.String:
                    return "string";
                    case GridDataType.Date:
                    return "datetime";
                    case GridDataType.Number:
                    return "number";
                }
            
               }

            


            

}