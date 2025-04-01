import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map-info',
  imports: [],
  templateUrl: './map-info.component.html',
  styleUrl: './map-info.component.css'
})
export class MapInfoComponent implements OnInit {
  map: any = null;
  constructor(private apiservice: AppService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const mapId = params.get('id') ?? '';
      this.apiservice.getMapById(mapId).subscribe({
        next: (data) => {
          this.map = data;
          console.log(this.map);
        },
        error: (error) => {
          console.error('Error fetching map data:', error);
        }
      });
    });
  }

  convertX(x: number, y: number): number {
    const minX = -9000, maxX = 7000;
  
    // Rotation de -90° → X devient -Y, Y devient X
    let rotatedX = y;
    
    return ((rotatedX - minX) / (maxX - minX)) * 100 ; // Convertit en %
  }
  
  convertY(x: number, y: number): number {
    const minY = -8000, maxY = 6000;
  
    // Rotation de -90° → Y devient X puis SYMÉTRIE AXIALE
    let rotatedY = x; // On inverse X pour faire la symétrie
  
    return 100 - ((rotatedY - minY) / (maxY - minY)) * 100 ; // Inverse Y pour correspondre à l'image
  }
}
