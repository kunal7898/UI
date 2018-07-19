import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class SaveRouterGuard implements CanDeactivate<CanComponentDeactivate> {

    protected source :Subject<any>;
    canDeactivate(
        component: CanComponentDeactivate, 
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean>//|Promise<boolean>|boolean  
        {
            this.source = new Subject<any>();
            component.canDeactivate().subscribe((result)=>{
                this.source.next(result);
            });
            return this.source;
        }
  
}
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean>;// | Promise<boolean>| boolean;
}