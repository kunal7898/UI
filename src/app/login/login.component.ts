import { Component, OnInit, ViewChild,Output,EventEmitter, ViewEncapsulation } from '@angular/core';
import { LoginFormResolver } from '../FormResolver/LoginFormResolver';
import { FormValidator } from '../Validator/FormValidator';
import { DxFormComponent } from "devextreme-angular/ui/form";
import { AppSettings } from '../AppCommon/App.Constant';
import { LoginModel } from '../Models/LoginModel';
import { LoadingModel } from '../Models/LoadingModel';
import { Subscription } from 'rxjs/Subscription';
import { LoginHandler } from '../Helpers/LoginHanlder';
import { SessionDataAgent } from '../SessionDataAgent/SessionDataAgent';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation:ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  //#region "Decalartion"
  formData:any;
  items :any[];
  Server : string ;
  loadingVisible: boolean = false;
  loadingPanal: any;
  loginSubscriber: Subscription;
  LoadingMessage : string ;
  IsLoginSucessFull : boolean = false;
  //#endregion

  @ViewChild(DxFormComponent) form: DxFormComponent;

 //#region "Constructor"

  constructor(public loginHandler :LoginHandler,  private router: Router,public SessionDataAgent:SessionDataAgent) { 
    this.SessionDataAgent.ClearStorage();
  }

//#endregion

  ngOnInit() {
    //Load Login Items
    this.formData =new  LoginModel.UserLoginModel({UserName: 'kunal5836@gmail.com', Password: '123',grant_type:"password"}).model;
    this.items= this.LoadItems();
  }

 //#region "Private Methods"

  private LoadItems():Array<object>{
    let viewresolver = new LoginFormResolver();
    let Items = Array<object>();
    viewresolver.LoadLoginMetaData().forEach(element => {
    Items.push({
      dataField:element["code"],
      label:element["AttributeType"]=="button"?null: {text:element["Name"]},
      width:"330px",
      editorType:this.getEditorType(element["AttributeType"]),
      editorOptions:this.getEditorOptions(this.getEditorType(element["AttributeType"]),element["HideData"]),
      validationRules: FormValidator.getMandatoryFieldsValidation(element["code"],element["IsMandatory"]) ,
      
    })
  });
  return Items;
  }


  public DoLogIn(event) {
    let loginForm: any = this.form.instance;
    let valid: any = loginForm.validate();
    event.preventDefault();
    if (valid.isValid) {
     this.LoadingMessage = "logging in...";
     this.loadingVisible =  true;
     this.initLogin();
    }
  }

  private initLogin(){
   this.loginSubscriber =  this.loginHandler.SignIn(this.formData).subscribe(
       result => {
         if(result!=null){
          this.loadingVisible =  false;
          this.LoadingMessage = "loading user environment...";
          this.loadingVisible =  true;
          this.IsLoginSucessFull=true;
          setTimeout(()=>{    //<<<---    using ()=> syntax
           this.loadingVisible =  false;
           this.LoadUserMenus();
      }, 2000);
         }
         else{
            this.loadingVisible =  false;
            this.IsLoginSucessFull=false;
         }
       
          }

)
  }


private LoadUserMenus(){
  this.router.navigate(['menu'])
}
 

  //Get Editor Type   
  private   getEditorType(Attributetype):any{
    if(Attributetype=="lookup")
     return "dxSelectBox";
     if(Attributetype=="Date")
     return "dxDateBox";
     if(Attributetype=="string")
     return "dxTextBox";
     if(Attributetype=="button")
     return "dxButton";
     else
     return null;
  
  }

    //Get Editor Option
    private  getEditorOptions(Type,HideData):any{
      if(Type=="dxSelectBox")
        return  {
         // dataSource:JSON.parse(localStorage.getItem(PicklistId)),
          displayExpr: "Name",
          valueExpr: "ID",
          searchEnabled: true,
          onSelectionChanged:function(e){
            window.alert("event fired");
            this.popupVisible=false;
           } 
        };
        if(Type=="dxButton")
        {
          var Component  = this;
          return  {
            text:"Login",
            type :"success",
            width:"321px",
            onClick: function(event,value) {
              var button =  event.component;
              button.option('disabled', true);
              Component.DoLogIn(event.event);
              if(!Component.IsLoginSucessFull)
              {
                button.option('disabled', false);
              }

          },
          }; 
        }
       if(Type=="dxTextBox" && HideData){
           return{
           mode:"password",
           showClearButton:true
            }
       }
       if(Type=="dxTextBox" && !HideData){
        return{
        showClearButton:true
         }
    }
      else
      return null;
    }

     //#endregion

    //Signup 
    public Signup(event){
      this.router.navigate(['Signup'])
    }

    public ForgotPassword(event){
      this.router.navigate(['ForgotPassword'])
    }

}
