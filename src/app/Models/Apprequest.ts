import { LoginModel } from "./LoginModel";
import { MetaDataModel } from "./MetaDataModel";
import { QueryEntityModel } from "./QueryEntityModel";
import { AppFilters } from "../AppCommon/Controls/App.QueryFilters";

export namespace AppRequest{


    export class LoginRequestMessage{
      public userloginRequest : AppRequest.LoginRequest;
      constructor(LoginModel :  LoginModel.UserLoginModel){
        this.userloginRequest =  new AppRequest.LoginRequest();
        this.userloginRequest.grant_type = LoginModel.grant_type;
        this.userloginRequest.UserName = LoginModel.UserName;
        this.userloginRequest.Password = LoginModel.Password;
      }


    }



    export class LoginResponseMessage{
     public userloginResponse  : AppRequest.LoginResponse;
    }

    export class MetadataRequestMessage{
        public metadataRequest : AppRequest.MetadataRequest;
        constructor(MetadataRequest: MetaDataModel.EntityMetaDataModel ){
            this.metadataRequest =  new AppRequest.MetadataRequest();
            this.metadataRequest.EntityType =  MetadataRequest.EntityType;

        }
    }

    
    export class EntityQueryRequestMessage{
        public QueryEntityRequest : AppRequest.EntityQueryRequest;
        constructor(queryEntityRequest: QueryEntityModel.EntityMetaDataModel ){
            this.QueryEntityRequest =  new AppRequest.EntityQueryRequest();
            this.QueryEntityRequest.EntityType =  queryEntityRequest.EntityType;

        }
    }

    export class EntityDataQueryRequestMessage{
        public QueryEntityRequest : AppRequest.EntityQueryRequest;
        constructor(queryEntityRequest: QueryEntityModel.EntityDataModel ){
            this.QueryEntityRequest =  new AppRequest.EntityQueryRequest();
            this.QueryEntityRequest.EntityType =  queryEntityRequest.EntityType;
            this.QueryEntityRequest.Filters = queryEntityRequest.Filters;

        }
    }

    export class LoginRequest{
       public grant_type : string = "password";
       public UserName : string;
        public  Password : string;
    }

    export class LoginResponse{
        public access_token : string ;
        public userName: string;
        public LastLogin : DateTimeFormat;
        public PhoneNumber: string;
        public UserType : string;
        public UserViews : JSON;
        public Metadata:JSON;
    }

    export class MetadataRequest{
       public EntityType : number
    }

    export class EntityQueryRequest{
        public EntityType : number;
        public Filters:Array<AppFilters.FilterModel>
     }

}