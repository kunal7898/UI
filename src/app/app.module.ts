import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DevExtremeModule,DxResponsiveBoxModule,DxChartModule } from 'devextreme-angular';
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
import { AlertService } from './Services/AlertService';
import { LogoutService } from './Services/LogoutService';
import { LogoutHandler } from './Helpers/LogoutHandler';
import { EntityDataGridComponent } from './entity-data-grid/entity-data-grid.component';
import { CatalogEntityDataGridHandler } from './Helpers/EntityDataGridHandler';
import { CataLogEntityDataGridService } from './Services/EntityDataGridService';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { CatalogEntityComponent } from './catalog-entity/catalog-entity.component';
import { QueryEntityHandler } from './Helpers/QueryEntityHanlder';
import { QueryEntityService } from './Services/QueryEntityService';
import { EntityFormComponent } from './entity-form/entity-form.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { FormLayoutHandler } from './Helpers/FormLayoutHandler';
import { UpdateEntityService } from './Services/UpdateEntityService';
import { LogoComponentComponent } from './Header/logo-component/logo-component.component';
import { HeaderComponent } from './Header/header/header.component';
import { ProfileComponent } from './Header/profile/profile.component';
import { CreateEntityService } from './Services/CreateEntityService';
import { CreateEntityHandler } from './Helpers/CreateEntityHandler';
import { UpdateEntityHandler } from './Helpers/UpdateEntityHandler';
import { DeleteEntityHandler } from './Helpers/DeleteEntityHanlder';
import { DeleteEntityService } from './Services/DeleteEntityService';
import { EntityMetaDataService } from './Services/EntityMetaDataService';
import { EntityMetaDataHandler } from './Helpers/EntityMetaDataHandler';
import { ChildGridComponent } from './child-grid/child-grid.component';
import { ChildEntityDataGridHandler } from './Helpers/ChildEntityDataGridHandler';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponentComponent,
    PagenotFoundComponent,
    EntityDataGridComponent,
    DashBoardComponent,
    CatalogEntityComponent,
    EntityFormComponent,
    FormLayoutComponent,
    LogoComponentComponent,
    HeaderComponent,
    ProfileComponent,
    ChildGridComponent,
    ForgotPasswordComponent,
    SignupComponent
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
    LoginHandler,
    LoginService,
    LogoutHandler,
    CataLogEntityDataGridService,
    CatalogEntityDataGridHandler,
    QueryEntityHandler,
    QueryEntityService,
    AlertService,
    LogoutService,
    UpdateEntityService,
    MenuHandler,
    FormLayoutHandler,
    AuthPreventer,
    CreateEntityHandler,
    UpdateEntityHandler,
    DeleteEntityHandler,
    DeleteEntityService,
    CreateEntityService,
    EntityMetaDataService,
    EntityMetaDataHandler,
    ChildEntityDataGridHandler,
    SessionDataAgent,
   { provide: HTTP_INTERCEPTORS, useClass: HTTPServiceInterceptor,multi: true },
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
