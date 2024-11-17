import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatIcon, MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [
    MatGridList,
    RouterLink,
    MatGridTile,
    MatCard,
    MatCardContent,
    MatCardImage,
    NgForOf,
    MatCardHeader,
    MatIconModule,
  ],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.css'
})
export class SportsComponent {
  sports = [
    {
      name: 'Football',
      image: '././img/Logofootball.jpg',
      route: '/football',
      icon: 'sports_soccer'
    },
    {
      name: 'Basketball',
      image: '././img/Logobasketball.jpg',
      route: '/basketball',
      icon: 'sports_basketball'
    },
    {
      name: 'Swimming',
      image: '././img/LogoSwimming.jpg',
      route: '/swimming',
      icon: 'sports_pool'
    },
    {
      name: 'Powerlifting',
      image: '././img/Logopowerlifting.jpg',
      route: '/powerLifting',
      icon: 'fitness_center'
    }
    ]
}
