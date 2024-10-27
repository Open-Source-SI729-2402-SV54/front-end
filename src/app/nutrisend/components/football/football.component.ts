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
import {FootballService} from "../../services/football.service";
import {Router} from "@angular/router";
import {Meals} from "../../model/meals.entity";

@Component({
  selector: 'app-football',
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
  templateUrl: './football.component.html',
  styleUrl: './football.component.css'
})
export class FootballComponent implements OnInit {
  football: Meals[] = [];
  selectedFootball: any;
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];

  constructor(private router: Router, private footballApi: FootballService) {}

  ngOnInit(): void {
    this.footballApi.getAllFootball().subscribe({
      next: (data) => {
        console.log('Datos de la API Powerlifting:', data);

        if (Array.isArray(data)) {
          this.football = data;
          this.selectedFootball = this.football.length > 0 ? this.football[0] : null;

          this.breakfastMeals = this.football.filter(meal => meal.categoryID === 2 && meal.typeID === 2);
          this.lunchMeals = this.football.filter(meal => meal.categoryID === 2 && meal.typeID === 1);
          this.dinnerMeals = this.football.filter(meal => meal.categoryID === 2 && meal.typeID === 3);

          console.log('Comidas saludables:', this.football);
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
