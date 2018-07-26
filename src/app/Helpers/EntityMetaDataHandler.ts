import { BaseHandler } from "./BaseHandler";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AppRequest } from "../Models/Apprequest";
import { CreateEntityService } from "../Services/CreateEntityService";
import { CreateEntityModel } from "../Models/CreateEntityModel";
import { EntityMetaDataService } from "../Services/EntityMetaDataService";
import { MetaDataModel } from "../Models/MetaDataModel";

@Injectable()
export class EntityMetaDataHandler extends BaseHandler{

    response : any;
    constructor(public EntityMetaDataService : EntityMetaDataService){
        super();
        }

        public EntityMetadata(EntityMetadata :  MetaDataModel.EntityMetaDataModel):Observable<any>{
            let Entityrequest =  new AppRequest.MetadataRequestMessage(EntityMetadata);
            this.EntityMetaDataService.GetEntityMetaData(Entityrequest.metadataRequest).subscribe( result => {
                this.source.next(result);
            },
            error => { console.error(error); })
            
            return (this.AsObservable()) ;
            
            }

}