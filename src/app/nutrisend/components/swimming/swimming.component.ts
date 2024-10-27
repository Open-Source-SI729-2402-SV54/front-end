import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {Router} from "@angular/router";
import {Meals} from "../../model/meals.entity";
import {SwimmingService} from "../../services/swimming.service";

@Component({
  selector: 'app-swimming',
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
    TitleCasePipe
  ],
  templateUrl: './swimming.component.html',
  styleUrl: './swimming.component.css'
})
export class SwimmingComponent implements OnInit {
  swimming: Meals[] = [];
  selectedSwimming: any;
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];

  constructor(private router: Router, private swimmingApi: SwimmingService) {}

  ngOnInit(): void {
    this.swimmingApi.getAllSwimming().subscribe({
      next: (data) => {
        console.log('Datos de la API Swimming:', data);

        if (Array.isArray(data)) {
          this.swimming = data;
          this.selectedSwimming = this.swimming.length > 0 ? this.swimming[0] : null;

          this.breakfastMeals = this.swimming.filter(meal => meal.categoryID === 7 && meal.typeID === 2);
          this.lunchMeals = this.swimming.filter(meal => meal.categoryID === 7 && meal.typeID === 1);
          this.dinnerMeals = this.swimming.filter(meal => meal.categoryID === 7 && meal.typeID === 3);

          console.log('Comidas saludables:', this.swimming);
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
