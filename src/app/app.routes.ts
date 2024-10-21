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
import {SwimmingComponent} from "./nutrisend/components/swimming/swimming.component";
import {BasketballComponent} from "./nutrisend/components/basketball/basketball.component";
import {FootballComponent} from "./nutrisend/components/football/football.component";
import {PowerliftingComponent} from "./nutrisend/components/powerlifting/powerlifting.component";
import {SportsComponent} from "./nutrisend/pages/sports/sports.component";
import {ScheduleComponent} from "./nutrisend/components/schedule/schedule.component";
import {NotificationsComponent} from "./nutrisend/components/notifications/notifications.component";
import {FoodComponent} from "./nutrisend/pages/food/food.component";
import {FoodFitComponent} from "./nutrisend/pages/food-fit/food-fit.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'order-premium', component: OrderTypeComponent },
  { path: 'order', component: OrderComponent },
  { path: 'food', component: FoodComponent },
  { path: 'food-fit', component: FoodFitComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'healthy', component: HealthyComponent },
  { path: 'availability', component: AvailabilityComponent },
  {path: 'sports', component: SportsComponent}, //Renzo
  {path: 'powerLifting', component: PowerliftingComponent},//Renzo
  {path: 'football', component: FootballComponent},//Renzo
  {path: 'basketball', component: BasketballComponent},//Renzo
  {path: 'swimming', component: SwimmingComponent},//Renzo
  {path: 'schedule', component: ScheduleComponent},//Renzo
  {path: 'notifications', component: NotificationsComponent},//Renzo
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];
