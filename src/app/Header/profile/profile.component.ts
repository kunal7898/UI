import { Component, OnInit, HostListener } from '@angular/core';
import { SessionDataAgent } from '../../SessionDataAgent/SessionDataAgent';
import { UserDataModel } from '../../Models/UserModel';
import { AlertService } from '../../Services/AlertService';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';
import { LogoutHandler } from '../../Helpers/LogoutHandler';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  logoutSubscriber: Subscription;
  menuVisible: boolean;
  loadingVisible: boolean = false;
  LoadingMessage : string ;
  userName:any;
  PhoneNumber:any;
  UserType:any;
  LastLogin:any;
  constructor(public SessionDataagent:SessionDataAgent,public AlertService:AlertService,public LogoutHandler:LogoutHandler,public router:Router) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(ev: KeyboardEvent) {
    document.getElementById("myNotification").style.display = "none";
    document.getElementById("myUser").style.display = "none";
  }
  show() {
    var x = document.getElementById("myUser");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      document.getElementById("myNotification").style.display = "none";
    }
    event.stopPropagation();
  }

  showNoti() {
    var x = document.getElementById("myNotification");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      document.getElementById("myUser").style.display = "none";
    }
    event.stopPropagation();
  }

  ngOnInit() {
    let settings = this.SessionDataagent.GetuserSettings();
    this.userName =  settings.userName;
    this.PhoneNumber =  settings.PhoneNumber;
    this.UserType =  settings.UserType;
    this.LastLogin =  settings.LastLogin;
  }


 public Logout(){
  this.AlertService.Logout("Are You Sure You want to Logout","Logout").then((response) => {
    if(response){
this.LoadingMessage = "logging you out...";
this.loadingVisible =  true;
     this.LogoutInternal();
     return ;
     }
 });
 }

 private LogoutInternal(){
    
  this.logoutSubscriber =  this.LogoutHandler.Logout().subscribe(
      result => {
          this.router.navigate(['/login'])
          this.loadingVisible =  false;
            console.log(result);
         } ,error => {  console.error(error); } )

}
 

}

