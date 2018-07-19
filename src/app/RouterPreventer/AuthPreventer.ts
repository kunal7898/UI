import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";


@Injectable()
export class AuthPreventer implements CanActivate {

  constructor(private sessionAgent: SessionDataAgent) {

  };
  canActivate() {

    console.log("AuthRouterGard");
    if (this.sessionAgent.GetAccessToken()!=null) {
      return true;
    } else {
      window.alert("You don't have permission to view this page");
      return false;
    }
  }
}