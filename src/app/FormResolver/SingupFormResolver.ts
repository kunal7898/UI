export class SingupFormResolver{

    public LoadSignupMetaData():Array<object>{
        let Values =  new Array<object>();
        Values.push(
        //{code:'Server',Name:'Server Name',AttributeType:'string',PicklistId:null,IsMandatory:true},
        {code:'Name',Name:'Name',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'Password',Name:'Password',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'MobileNo',Name:'Mobile No',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'PhoneNo',Name:'Phone No',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'Email',Name:'Email',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},

        {code:'OTP',Name:'OTP',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'Zone',Name:'Zone',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'Address1',Name:'Address Line 1',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'Address2',Name:'Address Line 2',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'StateID',Name:'State',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'CityID',Name:'City',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
        {code:'PIN',Name:'PIN',AttributeType:'string',PicklistId:null,IsMandatory:true,HideData:false},
       
      )
        return Values;
      }
}