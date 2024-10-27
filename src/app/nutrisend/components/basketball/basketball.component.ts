import {Component, OnInit} from '@angular/core';
import { BasketballService } from "../../services/basketball.service";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from "@angular/material/card";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import {NgForOf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {Router} from "@angular/router";
import {Meals} from "../../model/meals.entity";

@Component({
  selector: 'app-basketball',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatGridList,
    MatGridTile,
    NgForOf,
    NgOptimizedImage,
    TitleCasePipe,
  ],
  templateUrl: './basketball.component.html',
  styleUrls: ['./basketball.component.css']
})
export class BasketballComponent implements OnInit {
  basketball: Meals[] = [];
  selectedBasketball: any;
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];

  constructor(private router: Router, private basketballApi: BasketballService) {}

  ngOnInit(): void {
    this.basketballApi.getAllBasketball().subscribe({
      next: (data) => {
        console.log('Datos de la API Powerlifting:', data);

        // Verifica si los datos son válidos
        if (Array.isArray(data)) {
          this.basketball = data; // Asignar los datos directamente
          this.selectedBasketball = this.basketball.length > 0 ? this.basketball[0] : null; // Selecciona el primer elemento o null

          // Filtrar las comidas por categoría y tipo
          this.breakfastMeals = this.basketball.filter(meal => meal.categoryID === 1 && meal.typeID === 2); // Desayuno
          this.lunchMeals = this.basketball.filter(meal => meal.categoryID === 1 && meal.typeID === 1); // Almuerzo
          this.dinnerMeals = this.basketball.filter(meal => meal.categoryID === 1 && meal.typeID === 3); // Cena

          console.log('Comidas saludables:', this.basketball);
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
