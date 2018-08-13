import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SingupFormResolver } from '../FormResolver/SingupFormResolver';
import { FormValidator } from '../Validator/FormValidator';
import { ForgotPasswordFormResolver } from '../FormResolver/ForgotPasswordFormResolver';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation:ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {

  formData:any;
  items :any[];
  loadingVisible: boolean = false;
  loadingPanal: any;
  LoadingMessage : string ;
  constructor(private router: Router) { }

  ngOnInit() {
    this.formData = [];
    this.items = this.LoadItems();
  }

  
  private LoadItems():Array<object>{
    let viewresolver = new SingupFormResolver();
    let Items = Array<object>();
    viewresolver.LoadSignupMetaData().forEach(element => {
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
            text:"Signup",
            type :"success",
            width:"278px",
            onClick: function(event,value) {
              var button =  event.component;
              button.option('disabled', true);
     

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
    

    public Login(){
      this.router.navigate(['login'])
    }

    public DoSignup(event){
      
    }


}
