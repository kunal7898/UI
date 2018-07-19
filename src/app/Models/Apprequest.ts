import { LoginModel } from "./LoginModel";

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
    }


}