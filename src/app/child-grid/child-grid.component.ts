import { Component, OnInit, Input } from '@angular/core';
import { AppShared } from '../AppCommon/AppShared';
import { MetaDataGridModel } from '../Models/MetaDataGridModel';
import * as $ from 'jquery';
import { FreezeType, GridDataType } from '../AppCommon/App.Enums';
import { ChildEntityDataGridHandler } from '../Helpers/ChildEntityDataGridHandler';
@Component({
  selector: 'app-child-grid',
  templateUrl: './child-grid.component.html',
  styleUrls: ['./child-grid.component.css']
})
export class ChildGridComponent implements OnInit {

  @Input() currentSelection: AppShared.CurrentChildGrid;
  public Columns = [];
  public Data: Array<any>;
  constructor(public ChildEntityDataGridHandler:ChildEntityDataGridHandler) { }

  ngOnInit() {
  }

  ngOnChanges()
  {
    if (this.currentSelection) {
      this.InitChildGrid();
    }
  }
  private InitChildGrid()
  {
    if(this.currentSelection.Columns!=null){
       this.PrepareColumns(this.currentSelection.Columns as Array<MetaDataGridModel>)
    }

     this.Data = this.currentSelection.Data;
  }


  private PrepareColumns(columns : Array<MetaDataGridModel>){
    this.LoadColumns(columns);
  }

  private LoadColumns(result :  Array<MetaDataGridModel>){
  
    let col = Array<any>();
    result.forEach((element,index) => {
      if(element.ShowControl){
        var component = this;
        if (element.IsPrimaryEntity ) {
          this.Columns.push({
            dataField: element.Code,
            caption :element.Name,
            cellTemplate: function (container, options) {
              $('<a/>').addClass('dx-link')
                .text(options.text)
                .click('dxclick', function () {
                
                 
                }).appendTo(container);
            }
          })
        }
        else{
          this.Columns.push({
            dataField: element.Code,
            caption :element.Name,
            dataType:component.ChildEntityDataGridHandler.ParseDataType(element.AttributeType  as GridDataType),
            allowEditing:element.Readonly || (element.FreezeType == FreezeType.Edit && this.currentSelection.Metadata.IsEdit)?false:true,

          })
        }
      }
  })
     
  }
}
