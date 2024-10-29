import {Component, OnInit} from '@angular/core';
import { FoodFitService } from "../../services/food-fit.service";
import { ExerciseFit } from "../../model/exercise-fit.entity";
import { ExerciseFitService } from "../../services/exercise-fit.service";
import {Router} from "@angular/router";
import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faAppleAlt, faUtensils} from "@fortawesome/free-solid-svg-icons";
import {NgForOf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Meals} from "../../model/meals.entity";

@Component({
  selector: 'app-food-fit',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatButton
  ],
  templateUrl: './food-fit.component.html',
  styleUrl: './food-fit.component.css'
})
export class FoodFitComponent implements OnInit  {
  foodFit: Meals[] = [];
  selectedFoodFit: any;
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];

  exerciseFit: ExerciseFit[] = [];
  selectedExerciseFit: ExerciseFit | null = null;


  constructor(library: FaIconLibrary, private router: Router, private exercisesFitApi: ExerciseFitService, private foodFitApi: FoodFitService) {
    library.addIcons(faAppleAlt, faUtensils);
  }

  ngOnInit(): void {
    this.foodFitApi.getAllFoodFiT().subscribe({
      next: (data) => {
        console.log('Datos de la API Powerlifting:', data);

        if (Array.isArray(data)) {
          this.foodFit = data;
          this.selectedFoodFit = this.foodFit.length > 0 ? this.foodFit[0] : null;

          this.breakfastMeals = this.foodFit.filter(meal => meal.categoryID === 6 && meal.typeID === 2);
          this.lunchMeals = this.foodFit.filter(meal => meal.categoryID === 6 && meal.typeID === 1);
          this.dinnerMeals = this.foodFit.filter(meal => meal.categoryID === 6 && meal.typeID === 3);

          console.log('Comidas saludables:', this.foodFit);
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


    this.exercisesFitApi.getAllExerciseFities().subscribe({
      next: (data) => {
        console.log('Datos de la API Exercise Fit:', data);
        this.exerciseFit = data;
        this.selectedExerciseFit = this.exerciseFit.length > 0 ? this.exerciseFit[0] : null;
        console.log(this.selectedExerciseFit);
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
