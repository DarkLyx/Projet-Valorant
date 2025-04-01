import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-maps',
  imports: [RouterLink],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  apiservice = inject(AppService);

  mapsData: any[] = [];
  currentIndex: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.apiservice.getMaps().subscribe(
      (data) => this.mapsData = data
    );
  }

  selectMap(mapId: string): void {
    this.router.navigate(['/map-info', mapId]);
  }

  /*fetchMaps(): void {
    this.http.get<any>('https://valorant-api.com/v1/maps').subscribe(
      response => {
        if (response.status === 200) {
          this.mapsData = response.data;
        }
      },
      error => {
        console.error('Erreur lors de la récupération des maps:', error);
      }
    );
  }

  moveCarousel(direction: number): void {
    if (this.mapsData.length > 0) {
      this.currentIndex = (this.currentIndex + direction + this.mapsData.length) % this.mapsData.length;
    }
  }

  calculatePosition(value: number, multiplier: number, scalar: number): number {
    return (value * multiplier + scalar) * 100;
  }*/
}
