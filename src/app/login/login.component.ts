import { Component, OnInit, ViewChild,Output,EventEmitter } from '@angular/core';
import { LoginFormResolver } from '../FormResolver/LoginFormResolver';
import { FormValidator } from '../Validator/FormValidator';
import { DxFormComponent } from "devextreme-angular/ui/form";
import { AppSettings } from '../AppCommon/App.Constant';
import { LoginModel } from '../Models/LoginModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData:LoginModel.UserLoginModel;
  items :any[];
  Server : string ;
  loadingVisible: boolean = false;
  loadingPanal: any;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  constructor() { }

  ngOnInit() {
    //Load Login Items
    //this.formData ={};
    this.items= this.LoadItems();
  }


  private LoadItems():Array<object>{
    let viewresolver = new LoginFormResolver();
    let Items = Array<object>();
    viewresolver.LoadLoginMetaData().forEach(element => {
    Items.push({
      dataField:element["code"],
      editorType:FormValidator.getEditorType(element["AttributeType"]),
      editorOptions:FormValidator.getEditorOptions(FormValidator.getEditorType(element["AttributeType"]),element["PicklistId"]),
      validationRules: FormValidator.getMandatoryFieldsValidation(element["code"],element["IsMandatory"]) ,
      
    })
  });
  return Items;
  }
  


  public DoLogIn(event, panal) {
    let loginForm: any = this.form.instance;
    let valid: any = loginForm.validate();
    event.preventDefault();
    this.loadingPanal = panal;
    if (valid.isValid) {
      this.loadingPanal.message = "Signing In";
      this.loadingVisible = true;

    }
  }

private SetFormLoginval() {
  
  
}

}
