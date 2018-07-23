import { Injectable } from "@angular/core";
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";
import { MetaDataGridModel } from "../Models/MetaDataGridModel";
import { AppFormControls } from "../AppCommon/Controls/App.FormControl";
import { BaseHandler } from "./BaseHandler";
import { Observable } from "rxjs/Observable";
import { MetaDataModel } from "../Models/MetaDataModel";
import { AppRequest } from "../Models/Apprequest";
import { QueryEntityService } from "../Services/QueryEntityService";
import { QueryEntityModel } from "../Models/QueryEntityModel";

@Injectable()
export class FormLayoutHandler extends BaseHandler{

constructor(public SessionDataAgent:SessionDataAgent,public QueryEntityService :QueryEntityService){
super();
}

public LoadFormLayout(EntityType:number){
let metadatafromcache =  this.LoadMetadataFromCache(EntityType);
if(metadatafromcache!=null){
  let headerItems =  this.LoadHeaderItems();
return this.LoadInnerItems(headerItems,metadatafromcache);

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

private LoadInnerItems(headerItems:Array<any>,metadata:Array<MetaDataGridModel>):Array<any>{

    let fisrtcomponents  =  metadata.splice(0,3);
    if(fisrtcomponents.length>0){
        fisrtcomponents.forEach(value =>{
            if(value.ShowControl){
                headerItems[0].items.push({
                    dataField: value.Code,
                    editorType: this.getEditorType(value.AttributeType),
                    editorOptions: this.getEditorOptions(this.getEditorType(value.AttributeType)),
                    validationRules: this.getMandatoryFieldsValidation(value.Code, value.IsMandatory),
                  })
            }
          
        });
    }

    let Secondcomponents  =  metadata.splice(4,7);
    if(fisrtcomponents.length>0){
        Secondcomponents.forEach(value =>{
            if(value.ShowControl){
            headerItems[1].items.push({
                dataField: value.Code,
                editorType: this.getEditorType(value.AttributeType),
                editorOptions: this.getEditorOptions(this.getEditorType(value.AttributeType)),
                validationRules: this.getMandatoryFieldsValidation(value.Code, value.IsMandatory),
              })
            }
        });
    }

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
    if (Attributetype == "lookup")
      return "dxSelectBox";
    if (Attributetype == "Date")
      return "dxDateBox";
    if (Attributetype == "textarea")
      return "dxTextArea";
    if (Attributetype == "checkbox")
      return "dxCheckBox";
    if (Attributetype == "radiobox")
      return "dxRadioGroup";
    else
      return null;

  }



  private getEditorOptions(Type): any {
      return null;
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
   
    let entitydataRequest =  new AppRequest.EntityDataQueryRequestMessage(QueryEntityModel);
    let  request = entitydataRequest.QueryEntityRequest as    AppRequest.EntityQueryRequest;
    let response = this.QueryEntityService.LoadData(request);
    this.QueryEntityService.LoadData(request).subscribe( result => {
        this.source.next(result);
    },
    error => { console.error(error); })
    
    return (this.AsObservable()) ;
    
    
    }

}