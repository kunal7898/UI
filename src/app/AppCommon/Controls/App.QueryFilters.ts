export namespace AppFilters{

 export class Filter{

  public Filters:Array<FilterModel>;

 }

 export class FilterModel{
     public PropertyName : string;
     public Operation: string;
     public Value:string;
 }

}