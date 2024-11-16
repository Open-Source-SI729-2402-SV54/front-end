import {Component, OnInit} from '@angular/core';
import {DailyMeals, Schedule} from "../../model/schedule.entity";
import {ScheduleService} from "../../services/schedule.service";
import {HealthyService} from "../../services/healthy.service";
import {Meals} from "../../model/meals.entity";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatSort,
    NgIf,
    NgOptimizedImage,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit{
  scheduleTable: any[] = [];
  displayedColumns: string[] = ['day', 'breakfast', 'lunch', 'dinner'];
  userId: number = Number(localStorage.getItem('userId'));
  mealsMap: Map<number, Meals>  = new Map();

  constructor(
    private scheduleService: ScheduleService,
    private healthyService: HealthyService
  ){}

  ngOnInit(): void{
    this.loadAllMeals();
  }

  private loadAllMeals(): void{
    this.healthyService.getAllHealthies().subscribe(
      (meals) =>{
        this.mealsMap = new Map(meals.map((meal) => [meal.id, meal]));
        this.loadSchedule();
      },
      (error) => console.error('error al cargar los alimentos', error)
    );
  }


  private loadSchedule(): void{
    this.scheduleService.getScheduleByUserId(this.userId).subscribe(
      (schedules) =>{
        if(schedules.length > 0){
          const schedule = schedules[0];
          this.prepareTableData(schedule);
        }
      },
      (error) => console.error('error al cargar el calendario', error)
    );
  }

  private prepareTableData(schedule: Schedule): void {
    const days = [
      { key: 'monday', label: 'Monday' },
      { key: 'tuesday', label: 'Tuesday' },
      { key: 'wednesday', label: 'Wednesday' },
      { key: 'thursday', label: 'Thursday' },
      { key: 'friday', label: 'Friday' },
      { key: 'saturday', label: 'Saturday' },
      { key: 'sunday', label: 'Sunday' },
    ];
    days.forEach((day) => {
      const dailyMeals = schedule[day.key as keyof Schedule] as DailyMeals;

      this.scheduleTable.push({
        day: day.label,
        breakfast: this.mealsMap.get(dailyMeals.breakfast) || { name: 'No disponible', img: '' },
        lunch: this.mealsMap.get(dailyMeals.lunch) || { name: 'No disponible', img: '' },
        dinner: this.mealsMap.get(dailyMeals.dinner) || { name: 'No disponible', img: '' },
      });
    });
  }


  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}




















