import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Availability } from "../../model/availability.entity";
import { AvailabilityService } from "../../services/availability.service";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import { CommonModule } from '@angular/common';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input"; // Asegúrate de importar esto

@Component({
  selector: 'app-availability',
  standalone: true,
  templateUrl: './availability.component.html',
  imports: [
    CommonModule, // Agrega CommonModule aquí
    MatCardActions,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatButton,
    MatCardImage,
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel
  ],
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  availabilities: Availability[] = [];
  selectedAvailability: Availability | null = null;
  filteredAvailabilities: Availability[] = [];
  searchTerm: string = '';
  constructor(private router: Router, private availabilityApi: AvailabilityService) {}

  ngOnInit(): void {
    this.availabilityApi.getAllAvailabilities().subscribe({
      next: (data) => {
        console.log('Datos de la API Availability:', data);
        this.availabilities = data;
        this.selectedAvailability = this.availabilities.length > 0 ? this.availabilities[0] : null;
        console.log(this.selectedAvailability);
      },
      error: (err) => {
        console.error('Error al obtener disponibilidades', err);
      }
    });
  }

  onSearchChange(): void {
    this.filteredAvailabilities = this.availabilities.filter(avail =>
      avail.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
