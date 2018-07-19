import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MenuComponentComponent } from "./menu-component/menu-component.component";
import { AuthPreventer } from "./RouterPreventer/AuthPreventer";
import {PagenotFoundComponent} from "./pagenot-found/pagenot-found.component"

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