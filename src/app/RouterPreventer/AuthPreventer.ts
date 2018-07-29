import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";


@Injectable()
export class AuthPreventer implements CanActivate {

  constructor(private sessionAgent: SessionDataAgent,private router: Router) {

  };
  canActivate() {
    if (this.sessionAgent.GetAccessToken()!=null) {
      this.ClearLocalstr();
      return true;
    } else {
      this.ClearSessionStr();
      this.router.navigate(['/login'])
      return false;
    }
  }

  private ClearLocalstr(){
    this.sessionAgent.ClearLocalSt();
  }

  private ClearSessionStr(){
    this.sessionAgent.ClearStorage();
  }
}