import { Component, OnInit, Input,SimpleChanges, OnChanges } from '@angular/core';
import { AppShared } from '../AppCommon/AppShared';
import { FormLayoutHandler } from '../Helpers/FormLayoutHandler';
import { AppConstants } from '../AppCommon/App.Constant';
import { Subscription } from 'rxjs/Subscription';
import { QueryEntityModel } from '../Models/QueryEntityModel';
import { AppFilters } from '../AppCommon/Controls/App.QueryFilters';
import { UpdateEntityModel } from '../Models/UpdateEntityModel';


@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.css']
})
export class FormLayoutComponent implements OnChanges {

  @Input() currentForm: AppShared.CurrentForm;
  EntityDataSubscriber: Subscription;
  UpdateDataSubscriber:Subscription;
  public Tabs: any;
  LoadingMessage : string ;
  public SaveButton: any;
  public FormData: any = {};
  public FormLayout:any;
  public IsChildExist: boolean = false;
  public loadingVisible: boolean = false;
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
  queryPrms.push({PropertyName:"Id",Operation:"EqualsGuid",Value:this.currentForm.EntityId});
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
    this.LoadingMessage ="Saving Data...";
    this.loadingVisible = true;
    this.UpdateEntity(this.FormData as JSON);
  }

  private PrepareUpdateRequest(Data:JSON):UpdateEntityModel.UpdateDataModel{
    let request = new  UpdateEntityModel.UpdateDataModel;
    request.EntityType = this.currentForm.EntityType;
    request.Data  = Data;
    return request;
  }

  private UpdateEntity(Data:JSON):any{
    let req = this.PrepareUpdateRequest(Data);
    this.UpdateDataSubscriber =  this.formhanlder.UpdateEntityAsync(req).subscribe(
      result => {
        this.loadingVisible =  false;
         console.log(result);
         }
  
  )
  }
}
