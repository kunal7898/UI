import { Injectable } from "@angular/core";
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";
import { TreeView } from "../Models/TreeViewModel";

@Injectable()
export class MenuHandler{

constructor(public SessionDataAgent:SessionDataAgent){

}

public LoadMenuItems():Array<TreeView>{
return this.GetMenus();
}

private GetMenus():Array<TreeView>{
    let cachemenus = Array.of(this.SessionDataAgent.GetNav()) as Array<any>;
    let menu = cachemenus[0] as Array<any> ;
    let menus =   Array<TreeView>();
    menu.forEach(element => {
        let val  = new  TreeView;
        val.ID = element["ViewId"];
        val.text= element["ViewName"];
        val.EntityType= element["EntityType"];
        menus.push(val);
    });
return menus;
}

}