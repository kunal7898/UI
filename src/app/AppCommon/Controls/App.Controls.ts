export namespace AppControl{
    export class Tab {
        Id: number;
        Title: string;
        Icon: string;
        Columns:any;
        Data:any;
        Metadata:AppControl.FormMetadata;
    }
    export class FormMetadata{
        IsNew:boolean;
        IsEdit:boolean; 
    }

}