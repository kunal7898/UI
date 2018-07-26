import { BaseHandler } from "./BaseHandler";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AppRequest } from "../Models/Apprequest";
import { CreateEntityService } from "../Services/CreateEntityService";
import { CreateEntityModel } from "../Models/CreateEntityModel";

@Injectable()
export class CreateEntityHandler extends BaseHandler{

    response : any;
    constructor(public CreateEntity : CreateEntityService){
        super();
        }

        public CreateEntityData(CreateEntity :  CreateEntityModel.CreateDataModel):Observable<any>{
            let CreateEntityrequest =  new AppRequest.EntityCreateRequestMessage(CreateEntity);
            this.CreateEntity.CreateEntity(CreateEntityrequest.CreateEntityRequest).subscribe( result => {
                this.source.next(result);
            },
            error => { console.error(error); })
            
            return (this.AsObservable()) ;
            
            }

}