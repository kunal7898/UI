import { BaseHandler } from "./BaseHandler";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AppRequest } from "../Models/Apprequest";
import { UpdateEntityService } from "../Services/UpdateEntityService";
import { UpdateEntityModel } from "../Models/UpdateEntityModel";

@Injectable()
export class UpdateEntityHandler extends BaseHandler{

    response : any;
    constructor(public UpdateEntity : UpdateEntityService){
        super();
        }

        public UpdateEntityData(UpdateEntity :  UpdateEntityModel.UpdateDataModel):Observable<any>{
            let UpdateEntityrequest =  new AppRequest.EntityUpdateRequestMessage(UpdateEntity);
            this.UpdateEntity.UpdateEntity(UpdateEntityrequest.UpdateEntityRequest).subscribe( result => {
                this.source.next(result);
            },
            error => { console.error(error); })
            
            return (this.AsObservable()) ;
            
            }

}