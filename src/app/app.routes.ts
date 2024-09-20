import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PlansComponent } from './plans/plans.component';
import { RegisterCongratsComponent } from './register-congrats/register-congrats.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'register-congrats', component: RegisterCongratsComponent },
  // Ruta comodín para redirigir a Home si la ruta no coincide
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
