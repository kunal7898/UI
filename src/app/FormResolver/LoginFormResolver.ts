export class LoginFormResolver{

    public LoadLoginMetaData():Array<object>{
        let Values =  new Array<object>();
        Values.push(
        //{code:'Server',Name:'Server Name',AttributeType:'string',PicklistId:null,IsMandatory:true},
        {code:'UserName',Name:'User Name',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'Password',Name:'Password',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:true},
        {code:'',Name:'Login',AttributeType:'button',PicklistId:null,IsMandatory:true,HideData:false},
      )
        return Values;
      }
}