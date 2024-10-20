import {Component, OnInit} from '@angular/core';
import {OrderItem} from "../../model/order.entity";
import {OrderService} from "../../services/order.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatToolbar} from "@angular/material/toolbar";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatToolbar,
    MatLabel,
    MatInput,
    MatButton,
    MatIcon
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  breakfasts: any[] = [];
  lunches: any[] = [];
  dinners: any[] = [];
  selectedBreakfast: any;
  selectedLunch: any;
  selectedDinner: any;
  breakfastCount: number = 1;
  lunchCount: number = 1;
  dinnerCount: number = 1;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadBreakfasts();
    this.loadLunches();
    this.loadDinners();
  }

  loadBreakfasts(): void {
    this.orderService.getBreakfasts().subscribe(
      (data) => {
        this.breakfasts = data;
        console.log(this.breakfasts);
      },
      (error) => {
        console.error('Error fetching breakfasts', error);
      }
    );
  }

  loadLunches(): void {
    this.orderService.getLunches().subscribe(
      (data) => {
        this.lunches = data;
        console.log(this.lunches);
      },
      (error) => {
        console.error('Error fetching lunches', error);
      }
    );
  }

  loadDinners(): void {
    this.orderService.getDinners().subscribe(
      (data) => {
        this.dinners = data;
        console.log(this.dinners);
      },
      (error) => {
        console.error('Error fetching dinners', error);
      }
    );
  }

  onBreakfastSelect(id: string): void {
    if (id) {
      this.orderService.getBreakfastById(+id).subscribe(
        (data) => {
          this.selectedBreakfast = data;
        },
        (error) => {
          console.error('Error fetching breakfast by ID', error);
        }
      );
    } else {
      this.selectedBreakfast = null;
    }
  }

  onLunchSelect(id: string): void {
    if (id) {
      this.orderService.getLunchById(+id).subscribe(
        (data) => {
          this.selectedLunch = data;
        },
        (error) => {
          console.error('Error fetching lunch by ID', error);
        }
      );
    } else {
      this.selectedLunch = null;
    }
  }

  onDinnerSelect(id: string): void {
    if (id) {
      this.orderService.getDinnerById(+id).subscribe(
        (data) => {
          this.selectedDinner = data;
        },
        (error) => {
          console.error('Error fetching dinner by ID', error);
        }
      );
    } else {
      this.selectedDinner = null;
    }
  }

  incrementBreakfastCount(): void {
    this.breakfastCount++;
  }

  decrementBreakfastCount(): void {
    if (this.breakfastCount > 1) {
      this.breakfastCount--;
    }
  }

  incrementLunchCount(): void {
    this.lunchCount++;
  }

  decrementLunchCount(): void {
    if (this.lunchCount > 1) {
      this.lunchCount--;
    }
  }

  incrementDinnerCount(): void {
    this.dinnerCount++;
  }

  decrementDinnerCount(): void {
    if (this.dinnerCount > 1) {
      this.dinnerCount--;
    }
  }

  getTotal(): number {
    const breakfastTotal = this.selectedBreakfast ? this.selectedBreakfast.price * this.breakfastCount : 0;
    const lunchTotal = this.selectedLunch ? this.selectedLunch.price * this.lunchCount : 0;
    const dinnerTotal = this.selectedDinner ? this.selectedDinner.price * this.dinnerCount : 0;

    return breakfastTotal + lunchTotal + dinnerTotal;
  }
  pay(): void {
    const totalAmount = this.getTotal();

    if (totalAmount > 0) {
      console.log(`Payment processed for total amount: $${totalAmount}`);

      this.selectedBreakfast = null;
      this.selectedLunch = null;
      this.selectedDinner = null;

      this.breakfastCount = 1;
      this.lunchCount = 1;
      this.dinnerCount = 1;
      window.location.reload();

      alert(`Payment of $${totalAmount} has been processed!`);
    } else {
      alert('Please select at least one item to pay.');
    }
  }
}
