import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AppSettings } from "../AppCommon/App.Constant";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LogoutService{

    constructor(protected http: HttpClient){

    }

 public logout():Observable<any>{
    let body = new URLSearchParams();  
    let requestPoint = AppSettings.BASE_URL + AppSettings.LOGOUT_API;
    return this.http.post<any>(requestPoint,null);
 }

}