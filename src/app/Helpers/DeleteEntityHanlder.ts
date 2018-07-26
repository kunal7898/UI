import { BaseHandler } from "./BaseHandler";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AppRequest } from "../Models/Apprequest";
import { DeleteEntityModel } from "../Models/DeleteEntityModel";
import { DeleteEntityService } from "../Services/DeleteEntityService";

@Injectable()
export class DeleteEntityHandler extends BaseHandler{

    response : any;
    constructor(public DeleteEntity : DeleteEntityService){
        super();
        }

        public DeleteEntityData(DeleteEntity :  DeleteEntityModel.DeleteDataModel):Observable<any>{
            let DeleteEntityrequest =  new AppRequest.EntityDeleteRequestMessage(DeleteEntity);
            this.DeleteEntity.DeleteEntity(DeleteEntityrequest.DeleteEntityRequest).subscribe( result => {
                this.source.next(result);
            },
            error => { console.error(error); })
            
            return (this.AsObservable()) ;
            
            }

}