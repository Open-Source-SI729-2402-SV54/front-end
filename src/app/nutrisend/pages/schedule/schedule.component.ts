import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    NgForOf,
    MatIconButton,
    MatIconModule
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  schedule = {
    desayuno: [
      'Avena con Leche, Claras de Huevo y Plátano',
      'Tazón de yogur griego con granola y frutos secos',
      'Tostadas con Mantequilla de Maní y Plátano',
      'Tostada con Queso y Espinaca',
      'Huevo con tostada y palta',
      'Tostada con Huevos Revueltos y Espinaca',
      'Avena con Arándanos y Almendras'
    ],
    almuerzo: [
      'Bowl de Arroz con Pollo',
      'Cerdo con Puré y Ensalada Verde',
      'Ensalada César con Pollo',
      'Burrito de Carne, Frijoles y Verduras',
      'Burrito de Carne, Frijoles y Verduras',
      'Salmón a la plancha con espárragos al vapor',
      'Ensalada Fresca de Garbanzos con Atún'
    ],
    cena: [
      'Salmón con Espárragos y Papa',
      'Salmón al grill con puré de batata y espárragos',
      'Estofado de Carne con Papa y Zanahoria',
      'Estofado de Carne con Papa y Zanahoria',
      'Estofado de Carne con Papa y Zanahoria',
      'Crepé de Espinaca con Jamón de Pavo',
      'Pollo al curry con arroz basmati y zanahorias'
    ]
  };

  editSchedule() {
    // Lógica para editar horarios
    alert('Funcionalidad de editar no implementada aún.');
    // Aquí puedes implementar la lógica que desees, como abrir un modal o redirigir a otra página.
  }
}
