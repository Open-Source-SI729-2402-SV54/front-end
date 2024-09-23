import { Component } from '@angular/core';
import { Meal } from "../../model/meal.entity";
import { BasketballService } from "../../services/basketball.service";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from "@angular/material/card";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import {NgForOf, NgOptimizedImage} from "@angular/common";

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
  ],
  templateUrl: './basketball.component.html',
  styleUrls: ['./basketball.component.css']
})
export class BasketballComponent {
  breakfast: Meal[] = [];
  lunch: Meal[] = [];
  dinner: Meal[] = [];

  constructor(private basketballService: BasketballService) { }

  ngOnInit(): void {
    this.loadBreakfast();
    this.loadLunch();
    this.loadDinner();
  }

  loadBreakfast(): void {
    this.basketballService.getBreakfast().subscribe((data: Meal[]) => {
      console.log("Breakfast data received:", data);
      this.breakfast = data;
    });
  }

  loadLunch(): void {
    this.basketballService.getLunch().subscribe((data: Meal[]) => {
      console.log("Lunch data received:", data);
      this.lunch = data;
    });
  }

  loadDinner(): void {
    this.basketballService.getDinner().subscribe((data: Meal[]) => {
      console.log("Lunch data received:", data);
      this.dinner = data;
    });
  }
}
