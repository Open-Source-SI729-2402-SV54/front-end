import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HealthyService } from "../../services/healthy.service";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatSlider } from "@angular/material/slider";
import { FormsModule } from "@angular/forms";
import {Meals} from "../../model/meals.entity";

@Component({
  selector: 'app-healthy',
  standalone: true,
  templateUrl: './healthy.component.html',
  styleUrls: ['./healthy.component.css'],
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButton,
    CommonModule,
    MatCardModule,
    MatSlider,
    FormsModule,
  ]
})

export class HealthyComponent implements OnInit {
  healthiness: Meals[] = [];
  selectedHealthy: any;
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];
  calorieLimit: number = 0;
  constructor(private router: Router, private healthyApi: HealthyService) {}

  ngOnInit(): void {
    this.healthyApi.getAllHealthies().subscribe({
      next: (data) => {
        console.log('Datos de la API Healthy:', data);

        // Verifica si los datos son válidos
        if (Array.isArray(data)) {
          this.healthiness = data; // Asignar los datos directamente
          this.selectedHealthy = this.healthiness.length > 0 ? this.healthiness[0] : null;

          this.breakfastMeals = this.healthiness.filter(meal => meal.categoryID === 4 && meal.typeID === 2);
          this.lunchMeals = this.healthiness.filter(meal => meal.categoryID === 4 && meal.typeID === 1);
          this.dinnerMeals = this.healthiness.filter(meal => meal.categoryID === 4 && meal.typeID === 3);

          console.log('Comidas saludables:', this.healthiness);
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

  applyCalorieFilter(): void {
    this.breakfastMeals = this.healthiness.filter(
      meal => meal.categoryID === 4 && meal.typeID === 2 && meal.calories <= this.calorieLimit
    );
    this.lunchMeals = this.healthiness.filter(
      meal => meal.categoryID === 4 && meal.typeID === 1 && meal.calories <= this.calorieLimit
    );
    this.dinnerMeals = this.healthiness.filter(
      meal => meal.categoryID === 4 && meal.typeID === 3 && meal.calories <= this.calorieLimit
    );
  }

}
