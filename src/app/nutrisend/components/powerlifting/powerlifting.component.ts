import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import { MatCardModule } from '@angular/material/card';
import {MatButton} from "@angular/material/button";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {Router} from "@angular/router";
import {Meals} from "../../model/meals.entity";
import {PowerLiftingService} from "../../services/power-lifting.service";

@Component({
  selector: 'app-powerlifting',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardImage,
    MatCardHeader,
    MatCardContent,
    MatCardModule,
    NgIf,
    MatCardActions,
    MatButton,
    MatGridTile,
    MatGridList,
    TitleCasePipe
  ],
  templateUrl: './powerlifting.component.html',
  styleUrl: './powerlifting.component.css'
})
export class PowerliftingComponent implements OnInit {
  powerlifting: Meals[] = [];
  selectedPowerlifting: any;
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];

  constructor(private router: Router, private powerliftingApi: PowerLiftingService) {}

  ngOnInit(): void {
    this.powerliftingApi.getAllPowerLifting().subscribe({
      next: (data) => {
        console.log('Datos de la API Powerlifting:', data);


        if (Array.isArray(data)) {
          this.powerlifting = data;
          this.selectedPowerlifting = this.powerlifting.length > 0 ? this.powerlifting[0] : null;

          this.breakfastMeals = this.powerlifting.filter(meal => meal.categoryID === 3 && meal.typeID === 2);
          this.lunchMeals = this.powerlifting.filter(meal => meal.categoryID === 3 && meal.typeID === 1);
          this.dinnerMeals = this.powerlifting.filter(meal => meal.categoryID === 3 && meal.typeID === 3);

          console.log('Comidas saludables:', this.powerlifting);
          console.log('Desayunos:', this.breakfastMeals);
          console.log('Almuerzos:', this.lunchMeals);
          console.log('Cenas:', this.dinnerMeals);
        } else {
          console.error('Datos de la API no válidos:', data);
        }
      },
      error: (err) => {
        console.error('Error al obtener disponibilidades', err);
      }
    });
  }
}
