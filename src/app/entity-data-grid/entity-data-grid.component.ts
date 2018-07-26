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
import { DefaultTypes } from '../AppCommon/App.Enums';

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
  private MetadataModel:MetaDataModel.EntityMetaDataModel;
  AddButton = {
    text: 'Add',
    type: 'success'
  };
  DeleteButton = {
    text: 'Delete',
    type: 'success'
  };
  constructor(public CatalogEntityDataGridHandler:CatalogEntityDataGridHandler,  public QueryEntityHanlder:QueryEntityHandler,public SessiondataAgent : SessionDataAgent,   private router: Router,public DeleteEntityHanlder:DeleteEntityHandler) { }

  ngOnChanges() {
    this.LoadingMessage = "Loading Data..";
    this.loadingVisible = true;
    this.MetadataModel =  new MetaDataModel.EntityMetaDataModel();
    this.MetadataModel.EntityType =  this.currentSelection.EntityType;
    this.LoadDynamicColumnsAsync();
    this.LoadDynamicDataSourceAsync();

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
      if (element.IsPrimaryEntity) {
        this.columns.push({
          dataField: element.Code,
          caption :element.Name,
          cellTemplate: function (container, options) {
            $('<a/>').addClass('dx-link')
              .text(options.text)
              .click('dxclick', function () {
                component.EditEntityForm(options.data.Id);
              }).appendTo(container);
          }
        })
      }
      else{
        this.columns.push({
          dataField: element.Code,
          caption :element.Name,
        })
      }
    }
})
   
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

private NewEntityForm(){
  let perm = this.currentSelection.EntityType + '.' + this.currentSelection.ViewIndex + '.' + AppConstants.NULL_GUID;
  this.router.navigate(['/menu', 'entity', { id: perm }]);
} 

public onContentReady(event){
  this.DatagridComponent = event.component;
}


public onRowRemoving(event){
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

}
