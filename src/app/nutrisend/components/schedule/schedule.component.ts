import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {MatCard, MatCardHeader} from "@angular/material/card";

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardHeader
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  schedule = {
    Breakfast: [
      'Oatmeal with Milk, Egg Whites and Banana',
      'Greek yogurt bowl with granola and nuts',
      'Peanut Butter and Banana Toast',
      'Toast with Cheese and Spinach',
      'Egg with toast and avocado',
      'Toast with Scrambled Eggs and Spinach',
      'Oatmeal with Blueberries and Almonds'
    ],
    Lunch: [
      'Chicken Rice Bowl',
      'Pork with Mash and Green Salad',
      'Caesar Salad with Chicken',
      'Meat, Beans and Vegetables Burrito',
      'Meat, Beans and Vegetables Burrito',
      'Grilled salmon with steamed asparagus',
      'Fresh Chickpea Salad with Tuna'
    ],
    Dinner: [
      'Salmon with Asparagus and Potato',
      'Grilled salmon with mashed sweet potato and asparagus',
      'Meat Stew with Potato and Carrot',
      'Meat Stew with Potato and Carrot',
      'Meat Stew with Potato and Carrot',
      'Spinach Crepe with Turkey Ham',
      'Chicken curry with basmati rice and carrots'
    ]
  }
}
