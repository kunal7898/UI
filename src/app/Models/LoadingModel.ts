import { ModelBase } from "./ModelBase";
import { LoginModel } from "./LoginModel";

export class LoadingModel extends ModelBase<LoadingModel>{

    shadingColor  :  string  = "rgba(0,0,0,0.4)";
    _visible :  boolean ;
    bindingOptions =  {
        visible: this._visible ,
        shading  : true,
        closeOnOutsideClick : false,
        showIndicator :  true,
    };

      //#region "Property"

    public get visible():boolean{
     return this._visible;
   }


     public set visible(value){
         this._visible =  value;
    }


     //#endregion


  //#region "Constructor"
 

      //#endregion


}