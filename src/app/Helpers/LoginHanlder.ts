import { LoginModel } from "../Models/LoginModel";
import { Observable } from "rxjs/Observable";
import { AppRequest } from "../Models/Apprequest";
import { LoginService } from "../Services/LoginService";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BaseHandler } from "./BaseHandler";
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";
import { UserDataModel } from "../Models/UserModel";
import { ForgotEntityModel } from "../Models/ForgotPasswordModel";
@Injectable()
export class LoginHandler extends BaseHandler{
response : any;

constructor(public loginservice : LoginService,public SessionDataAgent:SessionDataAgent){
super();
}


//#region "Public Methods"

public SignIn(LoginModel :  LoginModel.UserLoginModel):Observable<any>{
let loginRequest =  new AppRequest.LoginRequestMessage(LoginModel);
this.loginservice.Login(loginRequest).subscribe( result => {
    this.OnLoginSuccess(result);
    this.source.next(result);
},
error => { this.source.next(null); })

return (this.AsObservable()) ;

}


public OnLoginSuccess(result:AppRequest.LoginResponse){
  
    if(result.access_token!=null){
        this.SessionDataAgent.SetMetadata(result.Metadata);
        this.SessionDataAgent.SetAccessToken(result.access_token);
        this.SessionDataAgent.SetNav(result.UserViews);
        let vResult = result as UserDataModel.UserModel;
        this.SessionDataAgent.SetUserSettings(vResult);

    }

}


public ForgotPassword(ForgotModel :  ForgotEntityModel.ForgotPasswordModel):Observable<any>{
    let ForgotEntityrequest =  new AppRequest.EntityForgotPasswordRequestMessage(ForgotModel);
    this.loginservice.ForgotPassword(ForgotEntityrequest.ForgotPasswordRequest).subscribe( result => {
        this.source.next(result);
    },
    error => { console.error(error); })
    
    return (this.AsObservable()) ;
    
    }





//#endregion


}