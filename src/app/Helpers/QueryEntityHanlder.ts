import { BaseHandler } from "./BaseHandler";
import { Injectable } from "@angular/core";
import { QueryEntityService } from "../Services/QueryEntityService";
import { QueryEntityModel } from "../Models/QueryEntityModel";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AppRequest } from "../Models/Apprequest";

@Injectable()
export class QueryEntityHandler extends BaseHandler{

    response : any;
    constructor(public QueryEntityService : QueryEntityService){
        super();
        }

        public LoadDataSourceDynamic(QueryEntity :  QueryEntityModel.EntityMetaDataModel):Observable<any>{
            let QueryEntityrequest =  new AppRequest.EntityQueryRequestMessage(QueryEntity);
            this.QueryEntityService.LoadDataSource(QueryEntityrequest.QueryEntityRequest).subscribe( result => {
                this.source.next(result);
            },
            error => { console.error(error); })
            
            return (this.AsObservable()) ;
            
            }


            public LoadDataDynamic(QueryEntity :  QueryEntityModel.EntityDataModel):Observable<any>{
                let QueryEntityrequest =  new AppRequest.EntityQueryRequestMessage(null,QueryEntity);
                this.QueryEntityService.LoadData(QueryEntityrequest.QueryEntityRequest).subscribe( result => {
                    this.source.next(result);
                },
                error => { console.error(error); })
                
                return (this.AsObservable()) ;
                
                }

}