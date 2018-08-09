export class ForgotPasswordFormResolver{

    public LoadForgotPasswordMetaData():Array<object>{
        let Values =  new Array<object>();
        Values.push(
        //{code:'Server',Name:'Server Name',AttributeType:'string',PicklistId:null,IsMandatory:true},
        {code:'UserName',Name:'User Name',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'',Name:'Forgot',AttributeType:'button',PicklistId:null,IsMandatory:true,HideData:false},
      )
        return Values;
      }
}