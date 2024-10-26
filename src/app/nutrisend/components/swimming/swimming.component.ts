import { Component } from '@angular/core';
import {Meal} from "../../model/meal.entity";
import {SwimmingService} from "../../services/swimming.service";
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
import {RouterLink} from "@angular/router";

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
        RouterLink
    ],
  templateUrl: './swimming.component.html',
  styleUrl: './swimming.component.css'
})
export class SwimmingComponent {
  breakfast: Meal[] = [];
  lunch: Meal[] = [];
  dinner: Meal[] = [];
  constructor(private swimmingServices: SwimmingService) {  }

  ngOnInit(): void{
    this.loadBreakfast();
    this.loadLunch();
    this.loadDinner();
  }

  loadBreakfast(): void{
    this.swimmingServices.getBreakfast().subscribe((data: Meal[]) => {
      this.breakfast = data;
    });
    console.log(this.breakfast);
  }
  loadLunch(): void{
    this.swimmingServices.getLunch().subscribe((data: Meal[]) => {
      this.lunch = data;
    });
    console.log(this.lunch);
  }
  loadDinner(): void {
    this.swimmingServices.getDinner().subscribe((data: Meal[]) =>{
      this.dinner = data;
    });
    console.log(this.dinner);
  }
}
