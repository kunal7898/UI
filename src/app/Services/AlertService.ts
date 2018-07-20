import { Injectable } from '@angular/core';
import { confirm , alert, custom } from 'devextreme/ui/dialog';

@Injectable()
export class AlertService {

  constructor() {
    
  }

//Confirm
 public ConfirmAlert(Message,title): Promise<boolean> {
    var Confirmresult = confirm(Message, title);
      
    return new Promise<boolean>((resolve, reject) => {
      Confirmresult.then(function (dialogResult) {
        resolve(dialogResult);
      });
   
    });
  }

  public Logout(Message,title): Promise<boolean> {
    var Confirmresult = confirm(Message, title);
      
    return new Promise<boolean>((resolve, reject) => {
      Confirmresult.then(function (dialogResult) {
        resolve(dialogResult);
      });
   
    });
  }




 //Alerts
  public SuccessAlert(Message:string,Title:string): Promise<boolean>{
   var Successresult = alert(Message,Title);

   return new Promise<boolean>((resolve, reject) => {
    Successresult.then(function () {
      resolve();
    });
 
  });
  }


  public ConnectionAlert(Message:string,Title:string): Promise<boolean>{
    var Connectionresult = alert(Message,Title);
 
    return new Promise<boolean>((resolve, reject) => {
      Connectionresult.then(function () {
       resolve();
     });
  
   });
   }


   public LoginFailed(Message:string,Title:string): Promise<boolean>{
    var LoginFailedresult = alert(Message,Title);
 
    return new Promise<boolean>((resolve, reject) => {
      LoginFailedresult.then(function () {
       resolve();
     });
  
   });
   }


   public ServerError(Message:string,Title:string): Promise<boolean>{
    var ServerErrorresult = alert(Message,Title);
 
    return new Promise<boolean>((resolve, reject) => {
      ServerErrorresult.then(function () {
       resolve();
     });
  
   });
   }


   public InfoAlert(Message:string,Title:string): Promise<boolean>{
    var InfoAlertresult = alert(Message,Title);
 
    return new Promise<boolean>((resolve, reject) => {
      InfoAlertresult.then(function () {
       resolve();
     });
  
   });
   }


   public FailAlert(Message:string,Title:string): Promise<boolean>{

    var Failresult = alert(Message,Title);
  
     return new Promise<boolean>((resolve, reject) => {
      Failresult.then(function () {
        resolve();
      });
   
    });
    }


}
