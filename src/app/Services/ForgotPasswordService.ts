import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppShared } from "../AppCommon/AppShared";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AppSettings } from "../AppCommon/App.Constant";
import { AppRequest } from "../Models/Apprequest";


@Injectable()
export class ForgotPasswordService{

    constructor(protected http: HttpClient){
       
    }
   
   public ForgotPassword(ForgotPasswordRequest: AppRequest.ForgotPasswordRequest){
    let requestPoint =AppSettings.BASE_URL+ AppSettings.FORGOTPASSWORD_API;
    return this.http.post<any>(requestPoint, ForgotPasswordRequest);
   }

}