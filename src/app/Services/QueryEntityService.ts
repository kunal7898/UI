import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppRequest } from "../Models/Apprequest";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AppSettings } from "../AppCommon/App.Constant";

@Injectable()
export class QueryEntityService{
    constructor(protected http: HttpClient){

    }
    public LoadDataSource(EntityQueryRequest: AppRequest.EntityQueryRequest):Observable<any>{
        
            let requestPoint =AppSettings.BASE_URL+ AppSettings.QUERYENTITY_API;
            return this.http.post<any>(requestPoint, EntityQueryRequest);
        }

  public LoadData(EntityQueryRequest: AppRequest.EntityQueryRequest):Observable<any>{
        
            let requestPoint =AppSettings.BASE_URL+ AppSettings.QUERYENTITY_API;
            return this.http.post<any>(requestPoint, JSON.stringify(EntityQueryRequest));
        
          }
}