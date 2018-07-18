export class LoginFormResolver{

    public LoadLoginMetaData():Array<object>{
        let Values =  new Array<object>();
        Values.push(
        //{code:'Server',Name:'Server Name',AttributeType:'string',PicklistId:null,IsMandatory:true},
        {code:'UserName',Name:'User Name',AttributeType:'string',PicklistId:null,IsMandatory:true},
        {code:'Password',Name:'Password',AttributeType:'string',PicklistId:null,IsMandatory:true},
        {code:'',Name:'Login',AttributeType:'button',PicklistId:null,IsMandatory:true},
      )
        return Values;
      }
}