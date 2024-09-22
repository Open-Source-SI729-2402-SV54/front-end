import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {PlansComponent} from "./nutrisend/pages/plans/plans.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {OrderComponent} from "./nutrisend/pages/order/order.component";
import {ProfileComponent} from "./nutrisend/pages/profile/profile.component";
import {SignInComponent} from "./nutrisend/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./nutrisend/pages/sign-up/sign-up.component";
import {OrderTypeComponent} from "./nutrisend/pages/order-type/order-type.component";
import {HealthyComponent} from "./nutrisend/pages/healthy/healthy.component";
import {AvailabilityComponent} from "./nutrisend/pages/availability/availability.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'order-premium', component: OrderTypeComponent },
  { path: 'order', component: OrderComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'healthy', component: HealthyComponent },
  { path: 'availability', component: AvailabilityComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];
