import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./menu-component.component.css'],
})
export class MenuComponentComponent implements OnInit {
  logoutSubscriber: Subscription;
  menuVisible: boolean;
  loadingVisible: boolean = false;
  LoadingMessage : string ;
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
    if(event.node.children.length>0){
        return;
      }
    if(event.itemData.Id=="200"){
        this.router.navigate(['menu'])
        return;
    }
    if(event.itemData.Id=="1_1_1_1"){
        this.alertService.Logout("Are You Sure You want to Logout","Logout").then((response) => {
            if(response){
      this.LoadingMessage = "logging you out...";
      this.loadingVisible =  true;
             this.Logout();
             return ;
             }
         });
    }
    if(event.itemData.Id=="1_1_1"){
        return ;
    }
    
    else if(event.itemData.Id!="1_1_1_1"){
        let params =  event.itemData.EntityType +'.'+event.itemData.Id;
        this.router.navigate(['/menu','CatalogEntity',{Token:params}]);
    }


    this.menuVisible = !this.menuVisible;

    
    // else{
        
    //   //window.alert(event.node.text);
    //   this.menuVisible = !this.menuVisible;
    // }
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
            this.loadingVisible =  false;
              console.log(result);
           } ,error => {  console.error(error); } )
 
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
            expanded:element["expanded"],
            DbStoreType:element["DbStoreType"]
          })
  
      });
  
     return TreeValue;
    }
}
