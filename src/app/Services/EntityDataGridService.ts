import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppShared } from "../AppCommon/AppShared";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AppSettings } from "../AppCommon/App.Constant";
import { AppRequest } from "../Models/Apprequest";
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";
import { MetaDataGridModel } from "../Models/MetaDataGridModel";

@Injectable()
export class CataLogEntityDataGridService{

    constructor(public SessionDataAgent:SessionDataAgent){

    }
    public LoadColumns(MetadataAttribute: AppRequest.MetadataRequest):Array<MetaDataGridModel>{
          
           let cacheMetadata = Array.of(this.SessionDataAgent.Getmetadata()) as Array<any>;
           if(cacheMetadata!=null){
            let currentDatas =  cacheMetadata[0].filter(s=>s.EntityType==MetadataAttribute.EntityType) as Array<MetaDataGridModel>;
            return currentDatas;
           }
          return null;
          }

}

@Injectable()
export class ChildEntityDataGridService{

    constructor(public SessionDataAgent:SessionDataAgent){

    }
    public LoadColumns(MetadataAttribute: AppRequest.MetadataRequest):Array<MetaDataGridModel>{
          
           let cacheMetadata = Array.of(this.SessionDataAgent.Getmetadata()) as Array<any>;
           if(cacheMetadata!=null){
            let currentDatas =  cacheMetadata[0].filter(s=>s.EntityType==MetadataAttribute.EntityType) as Array<MetaDataGridModel>;
            return currentDatas;
           }
          return null;
          }
          
}