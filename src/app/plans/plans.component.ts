import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatCard} from "@angular/material/card"; // Importar RouterModule

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  standalone: true,
  styleUrls: ['./plans.component.css'],
  imports: [RouterModule, MatCard] // Añadir RouterModule a los imports
})
export class PlansComponent {
  basicPlanTitle: string = 'Basic Plan';
  premiumPlanTitle: string = 'Premium Plan';
  basicPlanBenefits: string = `Beneficios:
- Acceso a recetas básicas
- Lista de compras semanal automatizada
- Recomendaciones generales de alimentación
Permite a los usuarios planificar y pedir alimentos para la semana.`;
  premiumPlanBenefits: string = `Beneficios:
- Planificación y pedidos de alimentos para todo el mes
- Ajustes automáticos según las necesidades nutricionales del usuario
- Menús personalizados que se ajustan dinámicamente según el régimen deportivo, objetivos de salud, y disponibilidad de alimentos
- Alertas avanzadas que indican el momento óptimo para consumir alimentos, sincronizadas con el horario deportivo y otros hábitos de salud.`;
}
