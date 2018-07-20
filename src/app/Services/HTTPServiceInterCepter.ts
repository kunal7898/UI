import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpHeaders,HttpErrorResponse,HttpResponse, HttpParams} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";

@Injectable()
export class HTTPServiceInterceptor implements  HttpInterceptor{


   constructor(public  SessionDataAgent:SessionDataAgent){

   }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        let headers = this.AddHedderParams(request); //{ 'Content-Type': 'application/json' }
        const newRequest = request.clone({ headers });
        return next.handle(newRequest)
          
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
         }
          
            
        return headers;
      }

      

}