import { AppRequest } from "../Models/Apprequest";
import { AppSettings } from "../AppCommon/App.Constant";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginService{


    constructor(protected http: HttpClient){

    }

  public Login(login: AppRequest.LoginRequestMessage):Observable<any>{
let body = new URLSearchParams();
body.set('username', login.userloginRequest.UserName);
body.set('password', login.userloginRequest.Password);
body.set('grant_type', "password");

    let requestPoint = AppSettings.LOGIN_API;


    return this.http.post<any>(requestPoint, body.toString());

  }

}