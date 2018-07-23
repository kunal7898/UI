import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MenuComponentComponent } from "./menu-component/menu-component.component";
import { AuthPreventer } from "./RouterPreventer/AuthPreventer";
import {PagenotFoundComponent} from "./pagenot-found/pagenot-found.component"
import { CatalogEntityComponent } from "./catalog-entity/catalog-entity.component";
import {EntityFormComponent} from './entity-form/entity-form.component'

export const routes : Routes=[

    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "menu",
        component: MenuComponentComponent,
        canActivate: [AuthPreventer], 
        children: [
            { path: 'CatalogEntity', component: CatalogEntityComponent },
            { path: 'entity', component: EntityFormComponent },
             
        ]
    },
    {
        path: "PageNotFound",
        component: PagenotFoundComponent
    },
    {
        path: "**",
        redirectTo: "/login",
        pathMatch: "full"
    }


];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);