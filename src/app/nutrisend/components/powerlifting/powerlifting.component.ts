
import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import { MatCardModule } from '@angular/material/card';
import {MatButton} from "@angular/material/button";
import {Meal} from "../../model/meal.entity";
import {PowerLiftingService} from "../../services/power-lifting.service";
import {withDisabledInitialNavigation} from "@angular/router";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-powerlifting',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardImage,
    MatCardHeader,
    MatCardContent,
    MatCardModule,
    NgIf,
    MatCardActions,
    MatButton,
    MatGridTile,
    MatGridList
  ],
  templateUrl: './powerlifting.component.html',
  styleUrl: './powerlifting.component.css'
})
export class PowerliftingComponent implements OnInit {
  breakfast: Meal[] = [];
  lunch: Meal[] = [];
  dinner: Meal[] = [];

  constructor(private powerLiftingServices: PowerLiftingService) {  }

  ngOnInit(): void{
    this.loadBreakfast();
    this.loadLunch();
    this.loadDinner();
  }

  loadBreakfast(): void{
    this.powerLiftingServices.getBreakfast().subscribe((data: Meal[]) => {
      this.breakfast = data;
    });
    console.log(this.breakfast);
  }
  loadLunch(): void{
    this.powerLiftingServices.getLunch().subscribe((data: Meal[]) => {
      this.lunch = data;
    });
    console.log(this.lunch);
  }
  loadDinner(): void {
    this.powerLiftingServices.getDinner().subscribe((data: Meal[]) =>{
      this.dinner = data;
    });
    console.log(this.dinner);
  }
}
