
import { Component } from '@angular/core';
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
import {NgForOf} from "@angular/common";
import {Meal} from "../../model/meal.entity";
import {FootballService} from "../../services/football.service";
import {RouterLink} from "@angular/router";

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
        RouterLink
    ],
  templateUrl: './football.component.html',
  styleUrl: './football.component.css'
})
export class FootballComponent {
  breakfast: Meal[] = [];
  lunch: Meal[] = [];
  dinner: Meal[] = [];
  constructor(private footballServices: FootballService) {  }

  ngOnInit(): void{
    this.loadBreakfast();
    this.loadLunch();
    this.loadDinner();
  }

  loadBreakfast(): void{
    this.footballServices.getBreakfast().subscribe((data: Meal[]) => {
      this.breakfast = data;
    });
    console.log(this.breakfast);
  }
  loadLunch(): void{
    this.footballServices.getLunch().subscribe((data: Meal[]) => {
      this.lunch = data;
    });
    console.log(this.lunch);
  }
  loadDinner(): void {
    this.footballServices.getDinner().subscribe((data: Meal[]) =>{
      this.dinner = data;
    });
    console.log(this.dinner);
  }


}
