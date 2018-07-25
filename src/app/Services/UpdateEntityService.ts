import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppShared } from "../AppCommon/AppShared";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AppSettings } from "../AppCommon/App.Constant";
import { AppRequest } from "../Models/Apprequest";
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";
import { MetaDataGridModel } from "../Models/MetaDataGridModel";

@Injectable()
export class UpdateEntityService{

    constructor(protected http: HttpClient){
       
    }
   
   public UpdateEntity(UpdateEntityRequest: AppRequest.EntityUpdateRequest){
    let requestPoint =AppSettings.BASE_URL+ AppSettings.UPDATEENTITY_API;
    return this.http.post<any>(requestPoint, UpdateEntityRequest);
   }

}