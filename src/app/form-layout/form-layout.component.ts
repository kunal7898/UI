import { Component, OnInit, Input,SimpleChanges, OnChanges } from '@angular/core';
import { AppShared } from '../AppCommon/AppShared';
import { FormLayoutHandler } from '../Helpers/FormLayoutHandler';
import { AppConstants } from '../AppCommon/App.Constant';
import { Subscription } from 'rxjs/Subscription';
import { QueryEntityModel } from '../Models/QueryEntityModel';
import { AppFilters } from '../AppCommon/Controls/App.QueryFilters';


@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.css']
})
export class FormLayoutComponent implements OnChanges {

  @Input() currentForm: AppShared.CurrentForm;
  EntityDataSubscriber: Subscription;
  LoadingMessage : string ;
  private SaveButton: any;
  private FormData: any = {};
  private FormLayout:any;
  private loadingVisible: boolean = false;
  constructor(public formhanlder : FormLayoutHandler) { }


  ngOnChanges(changes: SimpleChanges) {
    if (this.currentForm) {
      this.InitComponent();
    }
  }

private InitComponent(){
  this.LoadingMessage = "Loading Data..";
  this.loadingVisible = true;
  this.SetSaveButtonOptions();
  this.FormLayout = this.formhanlder.LoadFormLayout(this.currentForm.EntityType);
  if(this.currentForm.EntityId!=AppConstants.NULL_GUID){
    this.LoadEntity()
  }
 

}

private PrepareRequest():QueryEntityModel.EntityDataModel{
  let queryPrms = new Array<AppFilters.FilterModel>();
  queryPrms.push({PropertyName:"Code",Operation:"Equals",Value:"MH27AL"});
  let request = new  QueryEntityModel.EntityDataModel;
  request.EntityType = this.currentForm.EntityType;
  request.Filters = queryPrms;
  return request;
}

private LoadEntity():any{
  let req = this.PrepareRequest();
  this.EntityDataSubscriber =  this.formhanlder.LoadEntityAsync(req).subscribe(
    result => {
      this.loadingVisible =  false;
      this.FormData = result.Data.ResponseData[0];
       console.log(result);
       }

)
}


  private SetSaveButtonOptions() {
    this.SaveButton = {
      text: 'Save',
      type: 'success'
    };
  }

   public OnSave() {
    alert(JSON.stringify(this.FormData));
  }
}
