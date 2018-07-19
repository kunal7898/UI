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
import { SessionDataAgent } from './SessionDataAgent/SessionDataAgent';
import {Ng2Webstorage} from 'ngx-webstorage';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { MenuHandler } from './Helpers/MenuHandler';
import { AuthPreventer } from './RouterPreventer/AuthPreventer';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponentComponent,
    PagenotFoundComponent
  ],
  imports: [
    BrowserModule,
    Ng2Webstorage,
    DevExtremeModule,
    HttpClientModule,
    RoutingModule,
    DxResponsiveBoxModule
  ],
  providers: [
    LoginHandler,LoginService,
    MenuHandler,
    AuthPreventer,
    SessionDataAgent,
   { provide: HTTP_INTERCEPTORS, useClass: HTTPServiceInterceptor,multi: true },
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
