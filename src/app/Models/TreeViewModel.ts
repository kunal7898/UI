export class TreeView {
   public ID: string;
   public text: string;
   public icon: string;
   public ParentID: any;
   public ModuleName:string;
   public Folder:string;
   public SubFolder1:string;
   public SubFolder2:string;
   public expanded: false;
   public EntityType:number;
   public DbStoreType:number;
   public items: Array<TreeView> = [];
    constructor() {


    }
}