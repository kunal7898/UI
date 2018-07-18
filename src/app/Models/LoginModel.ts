import { ModelBase } from "./ModelBase";

export namespace LoginModel{
    



 export class UserLoginModel extends ModelBase<UserLoginModel>{

   
   // Declartion
   grant_type : string = "password";
   public  UserName : string=null;
   public  Password : string=null;
 }


}