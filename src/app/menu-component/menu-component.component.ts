import { Component, OnInit } from '@angular/core';
import { MenuModel } from '../Models/MenuModel';
import { TreeView } from '../Models/TreeViewModel';
import { MenuHandler } from '../Helpers/MenuHandler';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit {

  menuVisible: boolean;
  toolbarItems: any[];
  menus:any;
  width : number = 500;
  height :number = 500;
  
  constructor(public menuHanlder:MenuHandler) {
    this.menuVisible = true;
    this.toolbarItems = [
        {
            location: 'before',
            widget: 'dxButton',
            options: {
                icon: 'menu',
                onClick: () => {
                    this.menuVisible = !this.menuVisible;
                }
            }
        }
    ];

   }

  
   selectItem(event){
    event.node.expanded=true;
    if(event.node.children.length>0){
      return;
    }
    else{
        
      window.alert(event.node.text);
      this.menuVisible = !this.menuVisible;
    }
  }

    GotoNewView(item){
let v = item;
   }

  ngOnInit() {
   this.menus = this.CreateTreeView(this.menuHanlder.LoadMenuItems());

  }

  public CreateTreeView(Value){
  
    let TreeValue = Array<object>();
    
    if(Value==null)
      return;
      
      //https://js.devexpress.com/Documentation/Guide/Themes/Icon_Library/
  
      Value.forEach(element => {
         TreeValue.push({
            Id:element["ID"],
            ValueName:element["text"],
            icon: element["ParentID"]==0?'folder':'doc',
            ParentID: element["ParentID"] ,
          })
  
      });
  
     return TreeValue;
    }
}
