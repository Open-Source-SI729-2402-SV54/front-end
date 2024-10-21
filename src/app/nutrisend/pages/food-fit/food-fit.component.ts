import {Component, OnInit} from '@angular/core';
import { FoodFit } from "../../model/food-fit.entity";
import { FoodFitService } from "../../services/food-fit.service";
import { ExerciseFit } from "../../model/exercise-fit.entity";
import { ExerciseFitService } from "../../services/exercise-fit.service";
import {Router} from "@angular/router";
import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faAppleAlt, faUtensils} from "@fortawesome/free-solid-svg-icons";
import {NgForOf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

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
  exercisefities: ExerciseFit[] = [];
  selectedExerciseFit: ExerciseFit | null = null;

  foodfities: FoodFit[] = [];
  selectedFoodFit: FoodFit | null = null;

  constructor(library: FaIconLibrary, private router: Router, private foodfitApi: FoodFitService, private exercisefitApi: ExerciseFitService) {
    library.addIcons(faAppleAlt, faUtensils);
  }

  ngOnInit(): void {
    this.foodfitApi.getAllFoodFities().subscribe({
      next: (data) => {
        console.log('Datos de la API Food Fit:', data);
        this.foodfities = data;
        this.selectedFoodFit = this.foodfities.length > 0 ? this.foodfities[0] : null;
        console.log(this.selectedFoodFit);
      },
      error: (err) => {
        console.error('Error al obtener disponibilidades', err);
      }
    });
    this.exercisefitApi.getAllExerciseFities().subscribe({
      next: (data) => {
        console.log('Datos de la API Exercise Fit:', data);
        this.exercisefities = data;
        this.selectedExerciseFit = this.exercisefities.length > 0 ? this.exercisefities[0] : null;
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
