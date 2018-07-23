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
  constructor(public CatalogEntityDataGridHandler:CatalogEntityDataGridHandler,  public QueryEntityHanlder:QueryEntityHandler,public SessiondataAgent : SessionDataAgent,   private router: Router) { }

  ngOnChanges() {
    console.log(this.currentSelection);
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
      if (element.Code=="Code") {
        this.columns.push({
          dataField: element.Code,
          caption :element.Name,
          cellTemplate: function (container, options) {
            $('<a/>').addClass('dx-link')
              .text(options.text)
              .click('dxclick', function () {
                component.EditEntityForm(options.data.Id);
                console.log(options);
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
  this.QueryEntityHanlder.LoadDataSourceDynamic(queryModel).subscribe(
    result => {
      if(result.Data.ResponseData!=null){
        this.DataSource = result.Data.ResponseData ;
        this.loadingVisible = false;
      }
      else{
        this.loadingVisible=false;
      }
   
     console.log(result);
       }

)
}

private EditEntityForm(EntityId : string){
  let perm = this.currentSelection.EntityType + '.' + this.currentSelection.ViewIndex + '.' + EntityId;
  this.router.navigate(['/menu', 'entity', { id: perm }]);
}


public onContentReady(event){
  this.DatagridComponent = event.component;
}

}
