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
import { MetaDataModel } from '../Models/MetaDataModel';
import { MetaDataGridModel } from '../Models/MetaDataGridModel';
import { AppControl } from '../AppCommon/Controls/App.Controls';
import { SessionDataAgent } from '../SessionDataAgent/SessionDataAgent';


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
  EntityMetaDataSubscriber:Subscription;
  public Tabs: AppControl.Tab[];
  private RelationKeys :AppShared.RelationData[];
  LoadingMessage : string ;
  public SaveButton: any;
  public FormData: any = {};
  public FormLayout:any;
  public IsChildExist: boolean = false;
  public loadingVisible: boolean = false;
  private TabsData:{};
  private CachData:any;
  private RelatedData:Array<any>;
  constructor(public formhanlder : FormLayoutHandler,public AlertService:AlertService,public SessionDataAgent:SessionDataAgent) { }


  ngOnChanges(changes: SimpleChanges) {
    if (this.currentForm) {
      this.InitComponent();
    }
  }

private InitComponent(){
  this.ClearLocalstr();
  this.LoadingMessage = "Loading Data..";
  this.loadingVisible = true;
  this.SetSaveButtonOptions();
  this.LoadMetadata();
}


private ClearLocalstr(){
  this.SessionDataAgent.ClearLocalSt();
}



private LoadMetadata(){
  let metadataModel =  new   MetaDataModel.EntityMetaDataModel;
  metadataModel.EntityType = this.currentForm.EntityType;
  this.EntityDataSubscriber =  this.formhanlder.MetdataEntityAsync(metadataModel).subscribe(
    result => {
      this.loadingVisible =  false;

      if(result.EntityFields.ResponseData.RelatedMetadata!=null){
        this.SessionDataAgent.SetRelatedDataSchema(result.EntityFields.ResponseData.RelatedMetadata);
      }

      if(this.currentForm.EntityId!=AppConstants.NULL_GUID){
        this.FormLayout = this.formhanlder.LoadFormLayout(this.currentForm.EntityType,false,result.EntityFields.ResponseData.Master);
         var component = this;
         if(result.EntityFields.ResponseData.Relations!=null){
          Object.keys(result.EntityFields.ResponseData.Relations).forEach(function(k) {
            if(k!=null && k.length>0){
             component.RelationKeys =  new Array<AppShared.RelationData>();
             component.RelationKeys.push({Data:result.EntityFields.ResponseData.Relations[k] as Array<MetaDataGridModel>,RelationName:k})
            }
         });
         }
        
       this.LoadEntityData(result.EntityFields.ResponseData);
      }else{
        this.FormLayout = this.formhanlder.LoadFormLayout(this.currentForm.EntityType,true,result.EntityFields.ResponseData.Master);
        var component = this;
        if(result.EntityFields.ResponseData.Relations!=null){
          Object.keys(result.EntityFields.ResponseData.Relations).forEach(function(k) {
            if(k!=null && k.length>0){
             component.RelationKeys =  new Array<AppShared.RelationData>();
             component.RelationKeys.push({Data:result.EntityFields.ResponseData.Relations[k] as Array<MetaDataGridModel>,RelationName:k})
            }
         });
         }
       if(this.RelationKeys!=null && this.RelationKeys.length>0){
         this.LoadTabs(this.RelationKeys);
       }
        this.loadingVisible= false;
      }
       console.log(result);
       }

)
}


private LoadTabs(RelationKeys:Array<AppShared.RelationData>,Data?:any){
this.Tabs = [];

let Metadata =  new AppControl.FormMetadata();
if(this.currentForm.EntityId!=AppConstants.NULL_GUID){
  Metadata.IsEdit = true;
  Metadata.IsNew=false;
  RelationKeys.forEach(ele=>{
    this.Tabs.push({Data:Data,Columns:ele.Data,Title:ele.RelationName,Metadata:Metadata,Icon:null,Id:null});

});
}else{
  Metadata.IsEdit = false;
  Metadata.IsNew=true;
  RelationKeys.forEach(ele=>{
       this.Tabs.push({Data:[{}],Columns:ele.Data,Title:ele.RelationName,Metadata:Metadata,Icon:null,Id:null});
  
  });
}
this.IsChildExist=true;
}



private PrepareRequest():QueryEntityModel.EntityDataModel{
  let queryPrms = new Array<AppFilters.FilterModel>();
  queryPrms.push({PropertyName:"Id",Operation:"EqualsGuid",Value:this.currentForm.EntityId});
  let request = new  QueryEntityModel.EntityDataModel;
  request.EntityType = this.currentForm.EntityType;
  request.Filters = queryPrms;
  request.LoadAllRelations = true;
  return request;
}

private LoadEntityData(Datas:Array<MetaDataGridModel>):any{
  let req = this.PrepareRequest();
  this.EntityDataSubscriber =  this.formhanlder.LoadEntityAsync(req).subscribe(
    result => {
      this.loadingVisible =  false;
      if(result.Data.ResponseData!=null){
        this.FormData = result.Data.ResponseData.Master;
      }
      if(this.RelationKeys!=undefined && this.RelationKeys.length>0 && result.Data.ResponseData.Relations.length>0){
        this.LoadTabs(this.RelationKeys,result.Data.ResponseData.Relations);
      }
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
    if(this.Tabs!=undefined && this.Tabs.length>0){
      this.LoadTabsData();
    }
    if(this.currentForm.EntityId!=AppConstants.NULL_GUID){
      this.UpdateEntity(c);
    }
    else{
      this.CreateEntity(c);
    }
    
  }

  private LoadTabsData(){
     this.TabsData={};
     this.Tabs.forEach(eachtab=>{
       this.TabsData[eachtab.Title] = eachtab.Data;
      });
     let relateddatas = this.FormatRelatedRequest();
     if(relateddatas.length>0){
       this.FormData.RelatedData = relateddatas;
     }
  }

  private FormatRelatedRequest():Array<any>{
    this.CachData =  this.SessionDataAgent.GetRelatedSchema();
    this.RelatedData = [];
    var component = this;
    Object.keys(this.CachData).forEach(function(k) {
       if(k!=null && k.length>0){
         if(component.TabsData[k].length>0){
          component.TabsData[k][0].EntityType=component.CachData[k];
            component.RelatedData.push(component.TabsData[k][0]);
         }
      }
   });
    return this.RelatedData;
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
        if(result.IsCreateSucessfull)
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
