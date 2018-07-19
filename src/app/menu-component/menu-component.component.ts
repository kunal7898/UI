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
  TreeView=[
    {
        ID: "1",
        text: "Stores",
    }, {
        ID: "1_1",
        ParentID: "1",
        text: "Super Mart of the West",
    }, {
        ID: "1_1_1",
        ParentID: "1_1",
        text: "Video Players"
    }, {
        ID: "1_1_1_1",
        ParentID: "1_1_1",
        text: "HD Video Player",
        iconSrc: "images/products/1.png",
        price: 220
    }, {
        ID: "1_1_1_2",
        ParentID: "1_1_1",
        text: "SuperHD Video Player",
        iconSrc: "images/products/2.png",
        price: 270
    }, {
        ID: "1_1_2",
        categoryId: "1_1",
        text: "Televisions",
    }, {
        ID: "1_1_2_1",
        ParentID: "1_1_2",
        text: "SuperLCD 42",
        iconSrc: "images/products/7.png",
        price: 1200
    }, {
        ID: "1_1_2_2",
        ParentID: "1_1_2",
        text: "SuperLED 42",
        iconSrc: "images/products/5.png",
        price: 1450
    }, {
        ID: "1_1_2_3",
        ParentID: "1_1_2",
        text: "SuperLED 50",
        iconSrc: "images/products/4.png",
        price: 1600
    }
];
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
