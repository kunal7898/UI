import { Component, OnInit } from '@angular/core';
import { MenuModel } from '../Models/MenuModel';
import { TreeView } from '../Models/TreeViewModel';
import { MenuHandler } from '../Helpers/MenuHandler';
import { LogoutService } from '../Services/LogoutService';
import { AlertService } from '../Services/AlertService';
import { Subscription } from 'rxjs/Subscription';
import { LogoutHandler } from '../Helpers/LogoutHandler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit {
  logoutSubscriber: Subscription;
  menuVisible: boolean;
  toolbarItems: any[];
  menus:any;
  width : number = 300;
  height :number = 500;

  constructor(public menuHanlder:MenuHandler,public LogoutHandler:LogoutHandler,public alertService:AlertService,public router:Router) {
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
    if(event.itemData.ValueName=="Logout"){
        this.alertService.Logout("Are You Sure You want to Logout","Logout").then((response) => {
            if(response){
             this.Logout();
             }
         });
    }
    if(event.node.children.length>0){
      return;
    }
    else{
        
      //window.alert(event.node.text);
      this.menuVisible = !this.menuVisible;
    }
  }

    GotoNewView(item){
let v = item;
   }

  ngOnInit() {
   this.menus = this.CreateTreeView(this.menuHanlder.LoadMenuItems());

  }


  private Logout(){

    this.logoutSubscriber =  this.LogoutHandler.Logout().subscribe(
        result => {
            this.router.navigate(['/login'])
              console.log(result);
           } ,error => { this.router.navigate(['/login']); console.error(error); } )
 
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
            EntityType:element["EntityType"] ,
            expanded:element["expanded"]
          })
  
      });
  
     return TreeValue;
    }
}
