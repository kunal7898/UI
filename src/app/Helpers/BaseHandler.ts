import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";


@Injectable()
export class BaseHandler{


    protected source :Subject<any>;


    protected AsObservable(): Observable<any> {
        this.source = new Subject<any>();
        return(this.source.asObservable());
    }
    

}