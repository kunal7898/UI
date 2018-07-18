import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpHeaders,HttpErrorResponse,HttpResponse, HttpParams} from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class HTTPServiceInterceptor implements  HttpInterceptor{

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        let headers = this.AddHedderParams(request); //{ 'Content-Type': 'application/json' }
        const newRequest = request.clone({ headers });
        return next.handle(newRequest)
          
      }


      public AddHedderParams(request: HttpRequest<any>): HttpHeaders {
        let headers: HttpHeaders;
     
          headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            
        return headers;
      }

      

}