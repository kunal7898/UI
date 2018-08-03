import { Injectable } from "@angular/core";
import { BaseHandler } from "./BaseHandler";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { AttributeType, GridDataType } from "../AppCommon/App.Enums";

@Injectable()
export class ChildEntityDataGridHandler  extends BaseHandler{
    response : any;
    constructor(){
        super();
        }

    
            
   public ParseDataType(Type:GridDataType){
    switch(Type){
        case GridDataType.Checkbox:
        return "boolean";
        case GridDataType.String:
        return "string";
        case GridDataType.Date:
        return "datetime";
        case GridDataType.Number:
        return "number";
    }

   }

            

}