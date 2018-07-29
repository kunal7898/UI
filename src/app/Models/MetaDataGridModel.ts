export class MetaDataGridModel{
    public Id:string;
    public SchemaId : string;
    public EntityType :number;
    public Code : string;
    public Name : string;
    public Description : string;
    public AttributeType : string;
    public IsNullable:boolean;
    public IsMandatory :boolean;
    public Readonly : boolean;
    public ShowControl:boolean;
    public IsPrimaryEntity:boolean;
    public PicklistMasterId:string;
    public LookupEntityType :number; 
    public DisplayMember : string;
    public ValueMember :string;
    public FreezeType :number;
    public DefaultValue:string;
}