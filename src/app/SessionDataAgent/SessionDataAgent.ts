import { SessionStorageService,LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';
import { AppEnums } from '../AppCommon/App.Enums';
import { UserDataModel } from '../Models/UserModel';
import { MetaDataGridModel } from '../Models/MetaDataGridModel';
import { MetaDataModel } from '../Models/MetaDataModel';


@Injectable()
export class SessionDataAgent{
     //#region  "Constructor"
  constructor(
    private sessionSt: SessionStorageService,
    private localSt: LocalStorageService,
  ) {

  }
  //#endregion


  //#region  "Access Toke Store key "

 public SetAccessToken(value: any){
     this.sessionSt.store(AppEnums.AccessToken,value);
 }


 public GetAccessToken():string{
   return  this.sessionSt.retrieve(AppEnums.AccessToken);
}

  //#endregion


   //#region  "Access Toke Store key "
   
   public SetNav(value: any){
    this.sessionSt.store(AppEnums.UserNav,value);
}

public GetNav():JSON{
   return   JSON.parse(this.sessionSt.retrieve(AppEnums.UserNav));
}


    //#endregion

    public ClearStorage(){
        this.sessionSt.clear();
    }

    public SetMetadata(value){
        this.sessionSt.store(AppEnums.Metadata ,value);
    }

    public Getmetadata():JSON{
      return  JSON.parse(this.sessionSt.retrieve(AppEnums.Metadata))
    }


    public SetUserSettings(value:UserDataModel.UserModel){
        this.sessionSt.store(AppEnums.UserSettings ,value);

    }

    public GetuserSettings():UserDataModel.UserModel{
        return  this.sessionSt.retrieve(AppEnums.UserSettings) as UserDataModel.UserModel;
      }
      
    public SetFormActions(Data : Array<MetaDataGridModel>){
        this.localSt.store(AppEnums.FormActions,Data);
    }  

    public GetFormActions():Array<MetaDataGridModel>{
       return  this.localSt.retrieve(AppEnums.FormActions)
    }

    public ClearLocalSt(){
        this.localSt.clear();
    }

    public SetRelatedDataSchema(value:any){
        this.localSt.store(AppEnums.RelatedSchema,value);
    }

    public GetRelatedSchema():any{
       return this.localSt.retrieve(AppEnums.RelatedSchema);
    }
}