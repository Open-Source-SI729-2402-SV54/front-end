import {Component, OnInit} from '@angular/core';
import { FoodService } from "../../services/food.service";
import {Router} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatButton} from "@angular/material/button";
import {Meals} from "../../model/meals.entity";

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    NgForOf,
    FaIconComponent,
    MatButton
  ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent implements OnInit {

  food: Meals[] = [];
  selectedFood: any;
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];

  constructor(private router: Router, private foodApi: FoodService) {}

  ngOnInit(): void {
    this.foodApi.getAllFoodies().subscribe({
      next: (data) => {
        console.log('Datos de la API Powerlifting:', data);

        if (Array.isArray(data)) {
          this.food = data;
          this.selectedFood = this.food.length > 0 ? this.food[0] : null;

          this.breakfastMeals = this.food.filter(meal => meal.categoryID === 5 && meal.typeID === 2);
          this.lunchMeals = this.food.filter(meal => meal.categoryID === 5 && meal.typeID === 1);
          this.dinnerMeals = this.food.filter(meal => meal.categoryID === 5 && meal.typeID === 3);

          console.log('Comidas saludables:', this.food);
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

  navigateToFood(): void {
    this.router.navigate(['/food']);
  }
  navigateToFitFood(): void {
    this.router.navigate(['/food-fit']);
  }
  navigateToPay() {
    this.router.navigate(['healthy/payment']);
  }
}

