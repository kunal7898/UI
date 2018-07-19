
export namespace MenuModel {
    ///Meue Models
    export class MenuGroup{
       public key:string;
       public items:Array<any>;
   }
   export class MenuItem{
       public Caption:string;
       public Name:string
       public Glyph:string;
       public LargeGlyph:string;
       public Tag:string; 
       public text:string;
       public SubscriptionId:string;
       public ViewIndex:number;
   }
}