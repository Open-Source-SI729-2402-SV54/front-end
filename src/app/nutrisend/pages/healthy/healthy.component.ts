import { Component, OnInit } from '@angular/core';
import { Healthy } from "../../model/healthy.entity";
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
  healthilities: Healthy[] = [];
  selectedHealthy: Healthy | null = null;
  calorieSearch: number = 0;
  constructor(private router: Router, private healthyApi: HealthyService) {}

  ngOnInit(): void {
    this.healthyApi.getAllHealthies().subscribe({
      next: (data) => {
        console.log('Datos de la API Healthy:', data);
        this.healthilities = data;
        this.selectedHealthy = this.healthilities.length > 0 ? this.healthilities[0] : null;
        console.log(this.selectedHealthy);
      },
      error: (err) => {
        console.error('Error al obtener disponibilidades', err);
      }
    });
  }

  getHealthiesByType(type: string): Healthy[] {
    return this.healthilities.filter(h => h.type === type);
  }

  filterByCalories(): void {
    // Verifica que calorieSearch no sea null o undefined
    if (this.calorieSearch != null) { // Cambiado para verificar que no sea null o undefined
      this.healthilities = this.healthilities.filter(healthy => healthy.calories <= this.calorieSearch);
    } else {
      // Si calorieSearch es null, podrías optar por no filtrar o resetear la lista.
      // Por ejemplo, podrías obtener todos los elementos nuevamente:
      this.healthyApi.getAllHealthies().subscribe({
        next: (data) => {
          this.healthilities = data;
        },
        error: (err) => {
          console.error('Error al obtener disponibilidades', err);
        }
      });
    }
  }


  getFilteredHealthiesByType(type: string): Healthy[] {
    // Devuelve los alimentos filtrados según el tipo y las calorías
    return this.getHealthiesByType(type).filter(h => !this.calorieSearch || h.calories <= this.calorieSearch);
  }

  navigateToPay() {
    this.router.navigate(['healthy/payment']);
  }
}
