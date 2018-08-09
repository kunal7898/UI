import { Component, OnInit } from '@angular/core';
import { ForgotPasswordFormResolver } from '../FormResolver/ForgotPasswordFormResolver';
import { FormValidator } from '../Validator/FormValidator';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  formData:any;
  items :any[];
  constructor(private router: Router) { }

  ngOnInit() {
    this.formData = [];
    this.items = this.LoadItems();
  }

  
  private LoadItems():Array<object>{
    let viewresolver = new ForgotPasswordFormResolver();
    let Items = Array<object>();
    viewresolver.LoadForgotPasswordMetaData().forEach(element => {
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
            text:"Forgot Password",
            type :"success",
            width:"321px",
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

}
