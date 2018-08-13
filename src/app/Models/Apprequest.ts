import { LoginModel } from "./LoginModel";
import { MetaDataModel } from "./MetaDataModel";
import { QueryEntityModel } from "./QueryEntityModel";
import { AppFilters } from "../AppCommon/Controls/App.QueryFilters";
import { UpdateEntityModel } from "./UpdateEntityModel";
import { CreateEntityModel } from "./CreateEntityModel";
import { DeleteEntityModel } from "./DeleteEntityModel";
import { ForgotEntityModel } from "./ForgotPasswordModel";

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
        constructor(queryEntityRequest?: QueryEntityModel.EntityMetaDataModel,queryEntityDataRequest?:QueryEntityModel.EntityDataModel ){

            if(queryEntityRequest!=null){
                this.QueryEntityRequest =  new AppRequest.EntityQueryRequest();
                this.QueryEntityRequest.EntityType =  queryEntityRequest.EntityType;
                this.QueryEntityRequest.IsCatalogView = queryEntityRequest.IsCatalogView;
            }
            if(queryEntityDataRequest!=null){
                this.QueryEntityRequest =  new AppRequest.EntityQueryRequest();
                this.QueryEntityRequest.EntityType =  queryEntityDataRequest.EntityType;
                this.QueryEntityRequest.Filters = queryEntityDataRequest.Filters;
                this.QueryEntityRequest.LoadAllRelations = queryEntityDataRequest.LoadAllRelations;
            }
           

        }
       
    }

       
    export class EntityUpdateRequestMessage{
        public UpdateEntityRequest : AppRequest.EntityUpdateRequest;
        constructor(updateEntityRequest: UpdateEntityModel.UpdateDataModel ){
            this.UpdateEntityRequest =  new AppRequest.EntityUpdateRequest();
            this.UpdateEntityRequest.EntityType =  updateEntityRequest.EntityType;
            this.UpdateEntityRequest.Data  = updateEntityRequest.Data;
            this.UpdateEntityRequest.EntityFieldId  = updateEntityRequest.EntityFieldId;

        }
    }

    export class EntityCreateRequestMessage{
        public CreateEntityRequest : AppRequest.EntityCreateRequest;
        constructor(createEntityRequest: CreateEntityModel.CreateDataModel ){
            this.CreateEntityRequest =  new AppRequest.EntityCreateRequest();
            this.CreateEntityRequest.EntityType =  createEntityRequest.EntityType;
            this.CreateEntityRequest.Data  = createEntityRequest.Data;
            this.CreateEntityRequest.EntityFieldId  = createEntityRequest.EntityFieldId;

        }
    }

    export class EntityDeleteRequestMessage{
        public DeleteEntityRequest : AppRequest.EntityDeleteRequest;
        constructor(deleteEntityRequest: DeleteEntityModel.DeleteDataModel ){
            this.DeleteEntityRequest =  new AppRequest.EntityDeleteRequest();
            this.DeleteEntityRequest.EntityType =  deleteEntityRequest.EntityType;
            this.DeleteEntityRequest.Data  = deleteEntityRequest.Data;
            this.DeleteEntityRequest.EntityFieldId  = deleteEntityRequest.EntityFieldId;

        }
    }

    export class EntityForgotPasswordRequestMessage{
        public ForgotPasswordRequest : AppRequest.ForgotPasswordRequest;
        constructor(forgotpasswordRequest: ForgotEntityModel.ForgotPasswordModel ){
            this.ForgotPasswordRequest =  new AppRequest.ForgotPasswordRequest();
            this.ForgotPasswordRequest.Email =  forgotpasswordRequest.UserName;
           

        }
    }

    export class EntityDataQueryRequestMessage{
        public QueryEntityRequest : AppRequest.EntityQueryRequest;
        constructor(queryEntityRequest: QueryEntityModel.EntityDataModel ){
            this.QueryEntityRequest =  new AppRequest.EntityQueryRequest();
            this.QueryEntityRequest.EntityType =  queryEntityRequest.EntityType;
            this.QueryEntityRequest.Filters = queryEntityRequest.Filters;
            this.QueryEntityRequest.IsCatalogView = queryEntityRequest.IsCatalogView;

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
        public IsCatalogView:boolean;
        public LoadAllRelations:boolean;
     }

     export class EntityUpdateRequest{
        public EntityType : number;
        public EntityFieldId:string
        public Data:any;
     }

     export class EntityCreateRequest{
        public EntityType : number;
        public EntityFieldId:string
        public Data:any;
     }

     export class EntityDeleteRequest{
        public EntityType : number;
        public EntityFieldId:string
        public Data:any;
     }
    
     export class ForgotPasswordRequest{
         public Email :string;
     }


}