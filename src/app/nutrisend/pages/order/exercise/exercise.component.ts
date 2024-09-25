import { Component } from '@angular/core';
import { ExerciseService } from "../../services/exercise.service";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from "@angular/material/card";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import { Exercise } from '../../../model/exercise.entity';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatGridList,
    MatGridTile,
    NgForOf,
    NgOptimizedImage,
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {

  almuerzos: Exercise[] = [] ;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.loadAlmuerzos();
  }

  loadAlmuerzos(): void {
    this.exerciseService.getAlmuerzos().subscribe((data: Exercise[]) => {
      console.log("Exercise data received:", data);
      this.almuerzos = data;
    });
  }

}
