export namespace LoginModel{
    

    //User login Model Base
 export class LoginModelBase{
    grant_type : string = "password";
 }

 export class UserLoginModel extends LoginModelBase{

    //Constructor
   constructor(private model : UserLoginModel){
    super();
    this.username = model.username;
    this.password = model.password;
   }

   
   // Declartion
   public  username : string=null;
   public  password : string=null;
 }


}