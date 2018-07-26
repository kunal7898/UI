import { Component, OnInit, Input,SimpleChanges, OnChanges } from '@angular/core';
import { AppShared } from '../AppCommon/AppShared';
import { FormLayoutHandler } from '../Helpers/FormLayoutHandler';
import { AppConstants } from '../AppCommon/App.Constant';
import { Subscription } from 'rxjs/Subscription';
import { QueryEntityModel } from '../Models/QueryEntityModel';
import { AppFilters } from '../AppCommon/Controls/App.QueryFilters';
import { UpdateEntityModel } from '../Models/UpdateEntityModel';
import { AlertService } from '../Services/AlertService';
import { CreateEntityModel } from '../Models/CreateEntityModel';


@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.css']
})
export class FormLayoutComponent implements OnChanges {

  @Input() currentForm: AppShared.CurrentForm;
  EntityDataSubscriber: Subscription;
  UpdateDataSubscriber:Subscription;
  CreateDataSubscriber:Subscription;
  public Tabs: any;
  LoadingMessage : string ;
  public SaveButton: any;
  public FormData: any = {};
  public FormLayout:any;
  public IsChildExist: boolean = false;
  public loadingVisible: boolean = false;
  constructor(public formhanlder : FormLayoutHandler,public AlertService:AlertService) { }


  ngOnChanges(changes: SimpleChanges) {
    if (this.currentForm) {
      this.InitComponent();
    }
  }

private InitComponent(){
  this.LoadingMessage = "Loading Data..";
  this.loadingVisible = true;
  this.SetSaveButtonOptions();
  if(this.currentForm.EntityId!=AppConstants.NULL_GUID){
    this.FormLayout = this.formhanlder.LoadFormLayout(this.currentForm.EntityType,false);
    this.LoadEntity()
  }else{
    this.FormLayout = this.formhanlder.LoadFormLayout(this.currentForm.EntityType,true);
    this.loadingVisible= false;
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
    var n = this.FormData as JSON;
    var c =  [n];
    if(this.currentForm.EntityId!=AppConstants.NULL_GUID){
      this.UpdateEntity(c);
    }
    else{
      this.CreateEntity(c);
    }
    
  }

  private PrepareUpdateRequest(Data:any):UpdateEntityModel.UpdateDataModel{
    let request = new  UpdateEntityModel.UpdateDataModel;
    request.EntityType = this.currentForm.EntityType;
    request.Data  = Data;
    return request;
  }

  private PrepareCreateRequest(Data:any):CreateEntityModel.CreateDataModel{
    let request = new  CreateEntityModel.CreateDataModel;
    request.EntityType = this.currentForm.EntityType;
    request.Data  = Data;
    return request;
  }

  private UpdateEntity(Data:any):any{
    let req = this.PrepareUpdateRequest(Data);
    this.UpdateDataSubscriber =  this.formhanlder.UpdateEntityAsync(req).subscribe(
      result => {
        this.loadingVisible =  false;
        if(result.IsUpdateSucessfull)
        {
          this.AlertService.InfoAlert(result.ResponseMessage,"Entity Update");
        }
        else{
          this.AlertService.FailAlert(result.ResponseMessage,"Entity update failed");
        }
         console.log(result);
         }
  
  )
  }

  private CreateEntity(Data:any):any{
    let req = this.PrepareCreateRequest(Data);
    this.CreateDataSubscriber =  this.formhanlder.CreateEntityAsync(req).subscribe(
      result => {
        this.loadingVisible =  false;
        if(result.IsUpdateSucessfull)
        {
          this.AlertService.InfoAlert(result.ResponseMessage,"Entity Create");
        }
        else{
          this.AlertService.FailAlert(result.ResponseMessage,"Entity Create failed");
        }
         console.log(result);
         }
  
  )
  }
}
