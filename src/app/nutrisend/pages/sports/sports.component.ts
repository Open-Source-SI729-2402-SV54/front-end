import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {NgForOf} from "@angular/common";

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
    NgForOf
  ],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.css'
})
export class SportsComponent {
  sports = [
    {
      name: 'Football',
      image: '././img/Logofootball.jpg',
      route: '/football'
    },
    {
      name: 'Basketball',
      image: '././img/Logobasketball.jpg',
      route: '/basketball'
    },
    {
      name: 'Swimming',
      image: '././img/LogoSwimming.jpg',
      route: '/swimming'
    },
    {
      name: 'Powerlifting',
      image: '././img/Logopowerlifting.jpg',
      route: '/powerLifting'
    }
    ]
}
