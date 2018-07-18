import { LoginComponent } from "../login/login.component";

export  class FormValidator{

//Get Mandatory Fields Validation
    public static getMandatoryFieldsValidation(Code,IsMandatory):any{
        if(IsMandatory==true)
         return [
           {
           type: "required",
           message: Code+" is required"
       }]
       else
       return null;
       }

    
      
}