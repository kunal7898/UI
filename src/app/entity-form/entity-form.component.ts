import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppShared } from '../AppCommon/AppShared';
import { QueryStringParams } from '../AppCommon/App.Enums';
import { AppConstants } from '../AppCommon/App.Constant';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {

  private id: string;
  public currentForm: AppShared.CurrentForm;
  private sub: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      // if (this.tempService.selectedValue == this.id) {
      var queryParams: string[] = this.id.split(".");
      if (queryParams.length > 2) {
        this.currentForm = new AppShared.CurrentForm(
          parseInt(queryParams[QueryStringParams.EntityType]),
          queryParams[QueryStringParams.ViewId],
          queryParams[QueryStringParams.EntityId] );
      }
      // }
    });
  }

}
