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

//Get Editor Type   
       public static  getEditorType(Attributetype):any{
        if(Attributetype=="lookup")
         return "dxSelectBox";
         if(Attributetype=="Date")
         return "dxDateBox";
         if(Attributetype=="textarea")
         return "dxTextArea";
         if(Attributetype=="button")
         return "dxButton";
         else
         return null;
      
      }

      //Get Editor Option
      public static getEditorOptions(Type,PicklistId):any{
        if(Type=="dxSelectBox")
          return  {
            dataSource:JSON.parse(localStorage.getItem(PicklistId)),
            displayExpr: "Name",
            valueExpr: "ID",
            searchEnabled: true,
            onSelectionChanged:function(e){
              window.alert("event fired");
              this.popupVisible=false;
             } 
          };
          if(Type=="dxButton")
          {
            var Component  = this;
            return  {
              text:"Login",
              type :"success",
              onClick: function(event,value) {
               let com  =  new LoginComponent();
               com.DoLogIn(event.event,value);

            },
            }; 
          }
         
        else
        return null;
      }
      
}