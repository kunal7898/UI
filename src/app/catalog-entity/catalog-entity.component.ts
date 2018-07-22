import { Component, OnInit } from '@angular/core';
import { AppShared } from '../AppCommon/AppShared';
import { ActivatedRoute } from '@angular/router';
import { QueryStringParams } from '../AppCommon/App.Enums';

@Component({
  selector: 'app-catalog-entity',
  templateUrl: './catalog-entity.component.html',
  styleUrls: ['./catalog-entity.component.css']
})
export class CatalogEntityComponent implements OnInit {


   public currentSelection : AppShared.CurrentSelection

   private Metadata: string;
   private sub: any;
   DataSource: any;
 
   constructor(private route: ActivatedRoute) { }
 
   ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
       this.Metadata = params['Token']; // (+) converts string 'id' to a number
      // if (this.tempService.selectedValue == this.id) {
         var queryParams: string[] = this.Metadata.split(".");
         this.currentSelection = new AppShared.CurrentSelection();
         if (queryParams.length > 1) {
           this.currentSelection.EntityType = parseInt(queryParams[QueryStringParams.EntityType]);
           this.currentSelection.ViewIndex = (queryParams[QueryStringParams.ViewId])
         }
       //}
     });

}
}
