import { Component, OnInit, HostListener } from '@angular/core';
import { SessionDataAgent } from '../../SessionDataAgent/SessionDataAgent';
import { UserDataModel } from '../../Models/UserModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userName:any;
  PhoneNumber:any;
  UserType:any;
  LastLogin:any;
  constructor(public SessionDataagent:SessionDataAgent) { }

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


 

}

