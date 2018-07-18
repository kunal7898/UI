import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DevExtremeModule,DxResponsiveBoxModule } from 'devextreme-angular';
import { RoutingModule} from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginHandler } from './Helpers/LoginHanlder';
import { LoginService } from './Services/LoginService';
import { HTTPServiceInterceptor } from './Services/HTTPServiceInterCepter';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    DevExtremeModule,
    HttpClientModule,
    RoutingModule,
    DxResponsiveBoxModule
  ],
  providers: [
    LoginHandler,LoginService,
   { provide: HTTP_INTERCEPTORS, useClass: HTTPServiceInterceptor,multi: true },
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
