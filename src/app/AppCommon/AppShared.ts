export namespace AppShared{

    export class CurrentSelection{
        EntityType:number;
        ViewIndex:string;
    }

    export class CurrentForm{
        EntityType: number;
        ViewIndex : string;
        EntityId:string;
        constructor(entityType:number,viewIndex:string,entityId:string){
            this.EntityType =  entityType;
            this.ViewIndex =  viewIndex;
            this.EntityId = entityId;
        }
    }
}