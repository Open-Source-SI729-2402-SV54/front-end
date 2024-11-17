import {Component, OnInit} from '@angular/core';
import {Schedule} from "../../model/schedule.entity";
import {Meals} from "../../model/meals.entity";
import {AuthService} from "../../services/auth.service";
import {ScheduleService} from "../../services/schedule.service";
import {HealthyService} from "../../services/healthy.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  userId: number | null = null;
  userName: string = '';
  schedule: Schedule | null = null;
  meals: Meals[] = [];
  days: any[] = [];
  displayedColumns: string[] = ['day', 'breakfast', 'lunch', 'dinner'];
  constructor(    private authService: AuthService,
                  private scheduleService : ScheduleService,
                  private healthyService : HealthyService) {

  }

  ngOnInit(): void {
    this.userId = Number(this.authService.getUserId());

    if(this.userId){
      this.loadUserData();
      this.loadSchedule();
      this.loadMeals();
    }
  }
  loadUserData() {
    this.userId = this.authService.getUserId();
  }
  loadSchedule(): void {
    if (this.userId !== null) {
      this.scheduleService.getByUserId(this.userId).subscribe(
        (scheduleData) => {
          this.schedule = scheduleData.length > 0 ? scheduleData[0] : null;
          this.loadMeals();  // Llamamos a loadMeals después de cargar el horario
        },
        (error) => {
          console.error('Error al obtener el horario:', error);
        }
      );
    }
  }
  loadMeals(): void {
    if (this.schedule?.week) { // Usamos encadenamiento opcional para validar que schedule y week existen
      const weekDays: (keyof Schedule['week'])[] = [
        'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
      ];

      weekDays.forEach((day) => {
        const daySchedule = this.schedule!.week[day]; // Accedemos a week con certeza porque pasó la validación

        if (daySchedule) { // Validamos que daySchedule no sea nulo
          // Cargar cada comida usando los IDs de desayuno, almuerzo y cena
          this.loadMealForDay(day, 'breakfast', daySchedule.breakfast);
          this.loadMealForDay(day, 'lunch', daySchedule.lunch);
          this.loadMealForDay(day, 'dinner', daySchedule.dinner);
        } else {
          console.warn(`No hay datos para el día: ${day}`);
        }
      });
    } else {
      console.error('El horario no está disponible o no es válido');
    }
  }


  loadMealForDay(day: keyof Schedule['week'], mealType: 'breakfast' | 'lunch' | 'dinner', mealId: number): void {
    if (mealId > 0) {
      this.healthyService.getById(mealId).subscribe(
        (mealData) => {
          const meal = mealData[0]; // Asumiendo que la respuesta será un array de comidas

          // Asignar solo el nombre de la comida al día y tipo correspondiente en el Schedule
          if (this.schedule) {
            // Aseguramos que el tipo de día y comida se asigna correctamente
            (this.schedule.week[day] as any)[mealType] = meal.name; // Solo guardamos el nombre
          }
        },
        (error) => {
          console.error(`Error al obtener la comida para ${mealType} en ${day}:`, error);
        }
      );
    }
  }
}


















