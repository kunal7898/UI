import { LoginModel } from "../Models/LoginModel";
import { Observable } from "rxjs/Observable";
import { AppRequest } from "../Models/Apprequest";
import { LoginService } from "../Services/LoginService";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BaseHandler } from "./BaseHandler";
@Injectable()
export class LoginHandler extends BaseHandler{
response : any;

constructor(public loginservice : LoginService){
super();
}


//#region "Public Methods"

public SignIn(LoginModel :  LoginModel.UserLoginModel):Observable<any>{
let loginRequest =  new AppRequest.LoginRequestMessage(LoginModel);
this.loginservice.Login(loginRequest).subscribe( result => {
    this.source.next(result);
},
error => { console.error(error); })

return (this.AsObservable()) ;

}



//#endregion


}