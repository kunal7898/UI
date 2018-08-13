import { Component, OnInit,Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { AppShared } from '../AppCommon/AppShared';
import { CatalogEntityDataGridHandler } from '../Helpers/EntityDataGridHandler';
import { MetaDataModel } from '../Models/MetaDataModel';
import { QueryEntityService } from '../Services/QueryEntityService';
import { QueryEntityHandler } from '../Helpers/QueryEntityHanlder';
import { SessionDataAgent } from '../SessionDataAgent/SessionDataAgent';
import * as $ from 'jquery';
import { MetaDataGridModel } from '../Models/MetaDataGridModel';
import { Router } from '@angular/router';
import { QueryEntityModel } from '../Models/QueryEntityModel';
import { AppConstants } from '../AppCommon/App.Constant';
import { DeleteEntityHandler } from '../Helpers/DeleteEntityHanlder';
import { DeleteEntityModel } from '../Models/DeleteEntityModel';
import { DefaultTypes, GridDataType, DbStoreType } from '../AppCommon/App.Enums';
import { UserNav } from '../Models/UserNavModel';
import { AlertService } from '../Services/AlertService';

@Component({
  selector: 'app-entity-data-grid',
  templateUrl: './entity-data-grid.component.html',
  styleUrls: ['./entity-data-grid.component.css'],
  encapsulation:ViewEncapsulation.None,
})
export class EntityDataGridComponent implements OnChanges  {

  @Input() currentSelection: AppShared.CurrentSelection;
  loadingVisible: boolean = false;
  LoadingMessage : string ;
  DataSource :Array<any>;
  columns =[];
  DatagridComponent : any;
  EntityEditModel:UserNav;
  allowDeleting :boolean = true;
  private MetadataModel:MetaDataModel.EntityMetaDataModel;
  AddButton = {
    text: 'Add',
    type: 'success',
  };
  ShowAddButton:boolean = false;
  
  constructor(public CatalogEntityDataGridHandler:CatalogEntityDataGridHandler,  public QueryEntityHanlder:QueryEntityHandler,public SessiondataAgent : SessionDataAgent,   private router: Router,public DeleteEntityHanlder:DeleteEntityHandler,public AlertService:AlertService) { }

  ngOnChanges() {
    this.LoadingMessage = "Loading Data..";
    this.loadingVisible = true;
    this.MetadataModel =  new MetaDataModel.EntityMetaDataModel();
    this.MetadataModel.EntityType =  this.currentSelection.EntityType;
    this.LoadFormComponent();
    this.LoadDynamicColumnsAsync();
    this.LoadDynamicDataSourceAsync();

  }
 
 private LoadFormComponent(){
  let cacheMetadata = Array.of(this.SessiondataAgent.GetNav()) as Array<any>;
  if(cacheMetadata!=null){
   let currentDatas =  cacheMetadata[0].filter(s=>s.EntityType==this.MetadataModel.EntityType) as UserNav;
  if(currentDatas!=null )
  this.EntityEditModel =  currentDatas[0];
  this.CreateButtonComponents(currentDatas[0]);
  }
}

 private CreateButtonComponents(EditModel:UserNav){
  
  if(EditModel.DbStoreType==DbStoreType.Master || EditModel.DbStoreType==DbStoreType.Transcation){
   this.ShowAddButton=true;
   this.allowDeleting = true;
  }else{
    this.ShowAddButton= false;
    this.allowDeleting = false;
  }
  
}

  private LoadDynamicColumnsAsync() {
   let result = this.CatalogEntityDataGridHandler.LoadColumnsDynamic(this.MetadataModel) as Array<MetaDataGridModel>;
   if(result!=null){
    this.PrepareColumns(result);
   }
  
  
}


private  PrepareColumns(result:Array<any>){
  this.columns = [];
  //
  this.LoadColumns(result);
  
}

private LoadColumns(result :  Array<MetaDataGridModel>){
  
  let col = Array<any>();
  result.forEach((element,index) => {
    if(element.ShowControl){
      var component = this;
      if (element.IsPrimaryEntity ) {
        this.columns.push({
          dataField: element.Code,
          caption :element.Name,
          cellTemplate: function (container, options) {
            $('<a/>').addClass('dx-link')
              .text(options.text)
              .click('dxclick', function () {
                if(!component.EntityEditModel.IsEditAllowed){
                  component.AlertService.InfoAlert("Edit on this Entity is not allowed","Role Alert");
                }
                else{
                  component.EditEntityForm(options.data.Id);
                }
               
              }).appendTo(container);
          }
        })
      }
      else{
        this.columns.push({
          dataField: element.Code,
          caption :element.Name,
          dataType:component.CatalogEntityDataGridHandler.ParseDataType(element.AttributeType  as GridDataType),
        })
      }
    }
})
  if(this.columns.length==0){
   this.loadingVisible=false;
   this.AlertService.FailAlert("Error while Loading Metadata","MetaData Error");
  } 
}

private LoadDynamicDataSourceAsync() {
  let queryModel =  new QueryEntityModel.EntityMetaDataModel;
  queryModel.EntityType =  this.MetadataModel.EntityType;
  queryModel.IsCatalogView = true;
  this.QueryEntityHanlder.LoadDataSourceDynamic(queryModel).subscribe(
    result => {
      if(result.Data.ResponseData!=null){
        this.DataSource = result.Data.ResponseData ;
        this.loadingVisible = false;
      }
      else{
        this.loadingVisible=false;
      }
       }

)
}

private EditEntityForm(EntityId : string){
  let perm = this.currentSelection.EntityType + '.' + this.currentSelection.ViewIndex + '.' + EntityId;
  this.router.navigate(['/menu', 'entity', { id: perm }]);
}

public NewEntityForm(){
  if(this.EntityEditModel.IsAddAllowed){
    let perm = this.currentSelection.EntityType + '.' + this.currentSelection.ViewIndex + '.' + AppConstants.NULL_GUID;
    this.router.navigate(['/menu', 'entity', { id: perm }]);
  }else{
    this.AlertService.InfoAlert("Add on this Entity is not allowed","Role Alert");
  }
  
} 

public onContentReady(event){
  this.DatagridComponent = event.component;
}


public onRowRemoving(event){
  if(this.EntityEditModel.IsDeleteAllowed){
    this.LoadingMessage = "Deleting Data..";
    this.loadingVisible = true;
    let DeleteModel =  new DeleteEntityModel.DeleteDataModel;
    DeleteModel.EntityType =  this.MetadataModel.EntityType;
    DeleteModel.Data = event.data;
    let cacheMetadata = Array.of(this.SessiondataAgent.Getmetadata()) as Array<any>;
    if(cacheMetadata!=null){
     let currentDatas =  cacheMetadata[0].filter(s=>s.EntityType==this.MetadataModel.EntityType && s.DefaultValue==DefaultTypes.Delete) as MetaDataGridModel;
     DeleteModel.EntityFieldId =  "85841292-de83-43f4-ac2d-9c3c67cf033a";
    }
    this.DeleteEntityHanlder.DeleteEntityData(DeleteModel).subscribe(
      result => {
        if(result.Data!=undefined && result.Data.ResponseData!=null){
          this.DataSource = result.Data.ResponseData ;
          this.loadingVisible = false;
        }
        else{
          this.loadingVisible=false;
        }
     
         }
  
  )
  }
  else{
    this.AlertService.InfoAlert("Delete on this Entity is not allowed","Role Alert");
  }
  }


}
