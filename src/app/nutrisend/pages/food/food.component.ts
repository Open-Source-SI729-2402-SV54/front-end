import {Component, OnInit} from '@angular/core';
import { Food } from "../../model/food.entity";
import { FoodService } from "../../services/food.service";
import {Router} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faAppleAlt, faUtensils} from "@fortawesome/free-solid-svg-icons";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    NgForOf,
    FaIconComponent,
    MatButton
  ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent implements OnInit {
  foodies: Food[] = [];
  selectedFood: Food | null = null;

  constructor(library: FaIconLibrary,private router: Router, private foodApi: FoodService) {
    library.addIcons(faAppleAlt, faUtensils);
  }

  ngOnInit(): void {
    this.foodApi.getAllFoodies().subscribe({
      next: (data) => {
        console.log('Datos de la API Food :', data);
        this.foodies = data;
        this.selectedFood = this.foodies.length > 0 ? this.foodies[0] : null;
        console.log(this.selectedFood);
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

