import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DevExtremeModule,DxResponsiveBoxModule } from 'devextreme-angular';
import { RoutingModule} from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    DevExtremeModule,
    RoutingModule,
    DxResponsiveBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
