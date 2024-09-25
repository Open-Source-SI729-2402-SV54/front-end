import { Component } from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    MatSlideToggle,
    MatTable,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications = [
    {name: 'Breakfast', time: '6:00-7:00', status: false},
    {name: 'Lunch', time: '13:00-14:00', status: false},
    {name: 'Training', time: '8:00-11:00', status: false},
    {name: 'Dinner', time: '19:00-20:00', status: false},
  ];
}























