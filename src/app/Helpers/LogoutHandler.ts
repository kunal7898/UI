import { Injectable } from "@angular/core";
import { BaseHandler } from "./BaseHandler";
import { LogoutService } from "../Services/LogoutService";
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LogoutHandler extends BaseHandler{


    constructor(public LogoutService : LogoutService,public SessionDataAgent:SessionDataAgent){
        super();
        }

        
public Logout():Observable<any>{
    this.LogoutService.logout().subscribe( result => {
        this.SessionDataAgent.ClearStorage();
        console.log(result);
        this.source.next(result);
    },
    error => { console.error(error); })
    
    return (this.AsObservable()) ;
    
    }




    
}