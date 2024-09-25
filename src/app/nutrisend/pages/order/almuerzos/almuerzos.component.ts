import { Component } from '@angular/core';
import { Food } from "../model/foot.entity";
import { FoodService } from "../../services/foot.service";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from "@angular/material/card";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-almuerzos',
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
  templateUrl: './almuerzos.component.html',
  styleUrl: './almuerzos.component.css'
})
export class AlmuerzosComponent {

  almuerzos: Food[] = [] ;

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.loadAlmuerzos();
  }

  loadAlmuerzos(): void {
    this.foodService.getAlmuerzos().subscribe((data: Food[]) => {
      console.log("Almuerzos data received:", data);
      this.almuerzos = data;
    });
  }

}
