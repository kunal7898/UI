import { BaseHandler } from "./BaseHandler";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AppRequest } from "../Models/Apprequest";
import { UpdateEntityService } from "../Services/UpdateEntityService";
import { UpdateEntityModel } from "../Models/UpdateEntityModel";
import { ForgotPasswordService } from "../Services/ForgotPasswordService";
import { ForgotEntityModel } from "../Models/ForgotPasswordModel";

@Injectable()
export class ForgotPasswordHandler extends BaseHandler{

    response : any;
    constructor(public ForgotPasswordService : ForgotPasswordService){
        super();
        }

        public ForgotPassword(ForgotModel :  ForgotEntityModel.ForgotPasswordModel):Observable<any>{
            let ForgotEntityrequest =  new AppRequest.EntityForgotPasswordRequestMessage(ForgotModel);
            this.ForgotPasswordService.ForgotPassword(ForgotEntityrequest.ForgotPasswordRequest).subscribe( result => {
                this.source.next(result);
            },
            error => { console.error(error); })
            
            return (this.AsObservable()) ;
            
            }

}