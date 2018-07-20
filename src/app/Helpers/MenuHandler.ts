import { Injectable } from "@angular/core";
import { SessionDataAgent } from "../SessionDataAgent/SessionDataAgent";
import { TreeView } from "../Models/TreeViewModel";

@Injectable()
export class MenuHandler{

userSettings:Array<any>;

constructor(public SessionDataAgent:SessionDataAgent){

}

public LoadMenuItems():Array<TreeView>{
    this.LoadUserSettings();
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
     // Push Settings
     this.userSettings.forEach(element => {
        let val  = new  TreeView;
        val.ID = element["ID"];
        val.text= element["text"];
        val.EntityType= 0;
        val.ParentID = element["ParentID"];
        val.expanded = element["expanded"];
        menus.push(val);
    })

return menus;
}

private LoadUserSettings():Array<any>{

  return this.userSettings = [
      {
    
        ID: "1",
        text: "Settings",
        expanded: false
    },
    {
        ID: "1_1",
        ParentID: "1",
        text: "Account",
        expanded: false
    },
    {
        ID: "1_1_1",
        ParentID: "1_1",
        text: "Change Account Settings"
    },
    {
        ID: "1_1_1_1",
        ParentID: "1",
        text: "Logout",
        expanded: false
    }
];

}

}