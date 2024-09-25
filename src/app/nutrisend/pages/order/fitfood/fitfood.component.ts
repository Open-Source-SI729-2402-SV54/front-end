import { Component } from '@angular/core';
import { Food } from "../model/foot.entity";
import { FoodService } from "../../services/foot.service";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from "@angular/material/card";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-fitfood',
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
  templateUrl: './fitfood.component.html',
  styleUrl: './fitfood.component.css'
})
export class FitfoodComponent {

  fitfood: Food[] = [] ;

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.loadfitfood();
  }

  loadfitfood(): void {
    this.foodService.getfitfood().subscribe((data: Food[]) => {
      console.log("fitfood data received:", data);
      this.fitfood = data;
    });
  }

}
