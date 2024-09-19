import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {PlansComponent} from "./public/pages/plans/plans.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {OrderComponent} from "./public/pages/order/order.component";
import {ProfileComponent} from "./public/pages/profile/profile.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'order', component: OrderComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];
