import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpHeaders,HttpErrorResponse,HttpResponse, HttpParams} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";
import { AlertService } from "./AlertService";


@Injectable()
export class HTTPServiceInterceptor implements  HttpInterceptor{


   constructor(public  SessionDataAgent:SessionDataAgent,public AlertService:AlertService){

   }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        let headers = this.AddHedderParams(request); //{ 'Content-Type': 'application/json' }
        const newRequest = request.clone({ headers });
        return next.handle(newRequest).catch((e: any) => Observable.throw(this.errorHandler(e)));

      }

      errorHandler(error: any): void {
       this.AlertService.FailAlert(error.message,"Error");
      }


      public AddHedderParams(request: HttpRequest<any>): HttpHeaders {
        let headers: HttpHeaders;
         if(request.url.indexOf("Aauth/token")> 0){
          headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set("Access-Control-Allow-Origin", "*")
          .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         }else{
          headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('authorization', 'bearer '+this.SessionDataAgent.GetAccessToken())
          .set("Access-Control-Allow-Origin", "*")
          .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

         }
          
            
        return headers;
      }

      

}