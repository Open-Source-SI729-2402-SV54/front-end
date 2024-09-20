import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Importar AppRoutingModule
import {HttpClientModule} from "@angular/common/http";

// Importar los componentes
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PlansComponent } from './plans/plans.component';
import { RegisterCongratsComponent } from './register-congrats/register-congrats.component';

import { FormsModule } from '@angular/forms'; // Para ngModel

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RegisterCongratsComponent,
    PlansComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    AppComponent,
    HttpClientModule,
    // Necesario para ngModel en formularios
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



