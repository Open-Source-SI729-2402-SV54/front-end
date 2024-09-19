import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {PlansComponent} from "./nutrisend/pages/plans/plans.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {OrderComponent} from "./nutrisend/pages/order/order.component";
import {ProfileComponent} from "./nutrisend/pages/profile/profile.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'order', component: OrderComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];
