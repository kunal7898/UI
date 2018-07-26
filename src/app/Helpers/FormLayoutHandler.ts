import { Injectable } from "@angular/core";
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";
import { MetaDataGridModel } from "../Models/MetaDataGridModel";
import { AppFormControls } from "../AppCommon/Controls/App.FormControl";
import { BaseHandler } from "./BaseHandler";
import { Observable } from "rxjs/Observable";
import { MetaDataModel } from "../Models/MetaDataModel";
import { AppRequest } from "../Models/Apprequest";
import { QueryEntityModel } from "../Models/QueryEntityModel";
import { AttributeType, DefaultTypes } from "../AppCommon/App.Enums";
import { AppConstants, AppSettings } from "../AppCommon/App.Constant";
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { Subscription } from "rxjs/Subscription";
import { HttpClient } from "@angular/common/http";
import { AppFilters } from "../AppCommon/Controls/App.QueryFilters";
import { UpdateEntityModel } from "../Models/UpdateEntityModel";
import { CreateEntityModel } from "../Models/CreateEntityModel";
import { QueryEntityHandler } from "./QueryEntityHanlder";
import { UpdateEntityHandler } from "./UpdateEntityHandler";
import { CreateEntityHandler } from "./CreateEntityHandler";
import { DeleteEntityHandler } from "./DeleteEntityHanlder";
import { DeleteEntityModel } from "../Models/DeleteEntityModel";
import { EntityMetaDataHandler } from "./EntityMetaDataHandler";

@Injectable()
export class FormLayoutHandler extends BaseHandler{

DataSourceSubscriber: Subscription;
DataSource :DataSource;
datasourceinstance:any;
constructor(public SessionDataAgent:SessionDataAgent,public QueryEntityHandler :QueryEntityHandler, protected http: HttpClient,public UpdateEntityHandler:UpdateEntityHandler,public CreateEntityHandler:CreateEntityHandler,public DeleteEntityHandler:DeleteEntityHandler,public MetadataHandler:EntityMetaDataHandler){
super();
}

public LoadFormLayout(EntityType:number,Isnew:boolean,Metadata: Array<MetaDataGridModel>){
let metadatafromcache =  Metadata;
if(metadatafromcache!=null){
  let headerItems =  this.LoadHeaderItems();
return this.LoadInnerItems(headerItems,metadatafromcache,Isnew);

}
return null;
}


private LoadHeaderItems():Array<any>{
    let  headerItems =  Array<any>();
    let firstgroup =  this.CreateFirstGroup();
    let secondgroup =  this.CreateSecondGroup();
    headerItems.push(firstgroup);
    headerItems.push(secondgroup);
    return headerItems;
}

private LoadInnerItems(headerItems:Array<any>,metadata:Array<MetaDataGridModel>,Isnew :boolean):Array<any>{

         metadata.forEach(value =>{
            if(value.ShowControl){ 
                headerItems[0].items.push({
                    dataField: value.Code,
                    editorType: this.getEditorType(value.AttributeType),
                    editorOptions: this.getEditorOptions(this.getEditorType(value.AttributeType),value,Isnew ),
                    validationRules: this.getMandatoryFieldsValidation(value.Code, value.IsMandatory),
                  })
            }
          
        });
  

return headerItems;
}



private getMandatoryFieldsValidation(Code, IsMandatory): any {
    let validationRule = Array<object>();
    if (IsMandatory == true) {
      validationRule.push({
        type: "required",
        message: Code + " is required"
      })
    }

    return validationRule

  }

private getEditorType(Attributetype): any {
    if (Attributetype == AttributeType.Lookup)
      return "dxSelectBox";
    if (Attributetype == AttributeType.Date)
      return "dxDateBox";
    if (Attributetype == AttributeType.Textarea)
      return "dxTextArea";
    if (Attributetype == AttributeType.Checkbox)
      return "dxCheckBox";
    if (Attributetype ==AttributeType.Radiobox)
      return "dxRadioGroup";
      if (Attributetype ==AttributeType.String)
      return "dxTextBox";
    else
      return null;

  }


  private getEditorOptions(Type,metadataModel:MetaDataGridModel,Isnew:boolean): any {
    if (Type == "dxCheckBox") {
        return {
          disabled: false,
          readOnly: false,
          tabIndex: 1,
          onValueChanged: function (e) {

          }
        }
      }
      if (Type == "dxTextBox" && !Isnew) {
        return {
          disabled: metadataModel.Readonly,
        }
      }
      if (Type == "dxSelectBox"){
          var component = this;
        return {
            dataSource: component.LoadDataSourceInternal(metadataModel.PicklistMasterId,metadataModel.LookupEntityType),
            displayExpr: metadataModel.DisplayMember,
            valueExpr: "Email",
            searchEnabled: true,
            onInitialized: function (e) {
              //window.alert("event fired");
             component.datasourceinstance = e;
            },
            onValueChanged: function (e) {
             
             // window.alert("event fired");

            }
          };
      }
  
      else
       return null;
  }



private LoadDataSourceInternal(picklistmasterid?:string,lookupentitytype?:number):CustomStore{
    if(picklistmasterid!=AppConstants.NULL_GUID){

     }
     if(lookupentitytype!=0 && lookupentitytype!=undefined){
        var component = this;
        return new CustomStore({
          key:"LoginId",
          load: function (loadOptions: any) {
            let requestPoint =AppSettings.BASE_URL+ AppSettings.QUERYENTITY_API;
            let response ;
            let  request = new  AppRequest.EntityQueryRequest;
            request.EntityType =  106;
            return  component.http.post(requestPoint,request)
            .toPromise()
            .then(response => {
              var json = response as any;
              return {
                data: json.Data.ResponseData,
                totalCount:json.Data.ResponseData.length
              };
            }).catch(error => { window.alert(error) })
  
          },
          byKey:function(key){
            return null;
          }
        });
 
}
}

private LoadMetadataFromCache(EntityType:number):Array<MetaDataGridModel>{

    let cacheMetadata = Array.of(this.SessionDataAgent.Getmetadata()) as Array<any>;
    if(cacheMetadata!=null){
     let currentDatas =  cacheMetadata[0].filter(s=>s.EntityType==EntityType) as Array<MetaDataGridModel>;
     return currentDatas;
    }
    return null;

}

private CreateFirstGroup():AppFormControls.FormControls{
    let formcontrols  = new  AppFormControls.FormControls;
    formcontrols.cssClass = "first-group";
    formcontrols.colCount = 4;
    formcontrols.items = [];
    formcontrols.itemType = "group";
    return formcontrols;
}


private CreateSecondGroup():AppFormControls.FormControls{
    let formcontrols  = new  AppFormControls.FormControls;
    formcontrols.cssClass = "second-group";
    formcontrols.colCount = 4;
    formcontrols.items = [];
    formcontrols.itemType = "group";
    return formcontrols;
}


public LoadEntityAsync(QueryEntityModel :  QueryEntityModel.EntityDataModel):Observable<any>{
   
    this.QueryEntityHandler.LoadDataDynamic(QueryEntityModel).subscribe(
      result => {
        if(result.Data.ResponseData!=null){
          this.source.next(result);
        }
         }
  )
 return (this.AsObservable()) ;

 }


  public UpdateEntityAsync(UpdateEntityModel : UpdateEntityModel.UpdateDataModel):Observable<any> {

    let cacheMetadata = Array.of(this.SessionDataAgent.Getmetadata()) as Array<any>;
    if(cacheMetadata!=null){
     let currentDatas =  cacheMetadata[0].filter(s=>s.EntityType==UpdateEntityModel.EntityType && s.DefaultValue==DefaultTypes.Update) as MetaDataGridModel;
     UpdateEntityModel.EntityFieldId =  "DC1C7755-7F79-4E9A-8D1C-04ADB961F181";
    }
    this.UpdateEntityHandler.UpdateEntityData(UpdateEntityModel).subscribe(
      result => {
        if(result.Data.ResponseData!=null){
          this.source.next(result);
        }
         }
  )
  return (this.AsObservable()) ;

   }

    public CreateEntityAsync(CreateEntityModel : CreateEntityModel.CreateDataModel):Observable<any> {

      let cacheMetadata = Array.of(this.SessionDataAgent.Getmetadata()) as Array<any>;
      if(cacheMetadata!=null){
       let currentDatas =  cacheMetadata[0].filter(s=>s.EntityType==CreateEntityModel.EntityType && s.DefaultValue==DefaultTypes.Update) as MetaDataGridModel;
       CreateEntityModel.EntityFieldId =  "b27a68ad-7c21-4ddb-8a1d-8932459cf53b";
      }
    this.CreateEntityHandler.CreateEntityData(CreateEntityModel).subscribe(
      result => {
        if(result.Data.ResponseData!=null){
          this.source.next(result);
        }
         }
  )
  return (this.AsObservable()) ;

      }

      public DeleteEntityAsync(DeleteEntityModel : DeleteEntityModel.DeleteDataModel):Observable<any> {

        let cacheMetadata = Array.of(this.SessionDataAgent.Getmetadata()) as Array<any>;
        if(cacheMetadata!=null){
         let currentDatas =  cacheMetadata[0].filter(s=>s.EntityType==DeleteEntityModel.EntityType && s.DefaultValue==DefaultTypes.Update) as MetaDataGridModel;
         DeleteEntityModel.EntityFieldId =  "DC1C7755-7F79-4E9A-8D1C-04ADB961F181";
        }
        this.DeleteEntityHandler.DeleteEntityData(DeleteEntityModel).subscribe(
          result => {
            if(result.Data.ResponseData!=null){
              this.source.next(result);
            }
             }
      )
      return (this.AsObservable()) ;
    
       }

       public MetdataEntityAsync(EntityMetadataModel : MetaDataModel.EntityMetaDataModel):Observable<any> {

        this.MetadataHandler.EntityMetadata(EntityMetadataModel).subscribe(
          result => {
            if(result.EntityFields.ResponseData!=null){
              this.source.next(result);
            }
             }
      )
      return (this.AsObservable()) ;
    
       }


}