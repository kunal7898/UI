import { ModelBase } from "./ModelBase";

export namespace UserDataModel{
    



 export class UserModel extends ModelBase<UserModel>{

   
   // Declartion
   public  userName : string;
   public  LastLogin : DateTimeFormat;
   public  PhoneNumber : string;
   public UserType:string;
 }


}