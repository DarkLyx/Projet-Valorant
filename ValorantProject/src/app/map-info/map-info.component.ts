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
    const converter = this.mapConverterByMapName[this.map.name];
  
    // Rotation de -90° → X devient -Y, Y devient X
    let rotatedX = y;
    
    return ((rotatedX - converter.minX) / (converter.maxX - converter.minX)) * 100 ; // Convertit en %
  }
  
  convertY(x: number, y: number): number {
    const converter = this.mapConverterByMapName[this.map.name];
  
    // Rotation de -90° → Y devient X puis SYMÉTRIE AXIALE
    let rotatedY = x; // On inverse X pour faire la symétrie
  
    return 100 - ((rotatedY - converter.minY) / (converter.maxY - converter.minY)) * 100 ; // Inverse Y pour correspondre à l'image
  }
      noCalloutsMaps: string[] = ['Kasbah', 'Glitch', 'Piazza']; //Ici j'enleve des maps qui n'ont pas de callouts

      hasNoCallouts(mapName: string): boolean {
        return this.noCalloutsMaps.includes(mapName);
      }

    mapConverterByMapName: { [key: string]: Converter } = {
      Ascent: ascentCallouts,
      Split: splitCallouts,
      Fracture: fractureCallouts,
      Bind: bindCallouts,
      Breeze: breezeCallouts,
      District: districtCallouts,
      Drift: driftCallouts,
      Abyss: abyssCallouts,
      Lotus: lotusCallouts,
      Sunset: sunsetCallouts,
      Pearl: pearlCallouts,
      Icebox: iceboxCallouts,
      Haven: havenCallouts,
    };
}

interface Converter {   // Je dois convertir pour chaque map car les gars qui ont 
  minX: number;         // codé l'API ne savent pas se répérer sur une carte 
  maxX: number;
  minY: number;
  maxY: number;
}

// Tous les maps qui ont des callouts pour les afficher aux bons endroits
const ascentCallouts: Converter = 
  {minX: -10500, maxX: 2500, minY: -7000, maxY: 8000}
;

const splitCallouts: Converter = 
  {minX: -11000, maxX: 3500, minY: -4500, maxY: 8500}
;

const fractureCallouts: Converter = 
  {minX: -7000, maxX: 6500, minY: 1750, maxY: 14750}
;

const bindCallouts: Converter = 
  {minX: -9500, maxX: 8500, minY: -2050, maxY: 16750}
;

const breezeCallouts: Converter =
  {minX: -6000, maxX: 8500, minY: -4000, maxY: 11000}
;

const districtCallouts: Converter =
  {minX: -4000, maxX: 4000, minY: -6000, maxY: 4000}
;

const driftCallouts: Converter =
  {minX: -7000, maxX: 7000, minY: -8500, maxY: 6000}
;

const abyssCallouts: Converter =
  {minX: -6000, maxX: 7000, minY: -6500, maxY: 6000}
;

const lotusCallouts: Converter =
  {minX: -6000, maxX: 8500, minY: -2000, maxY: 12500}
;

const sunsetCallouts: Converter =
  {minX: -7000, maxX: 6000, minY: -7500, maxY: 5500}
;

const pearlCallouts: Converter =
  {minX: -6000, maxX: 7500, minY: -3500, maxY: 13000}
;

const iceboxCallouts: Converter =
  {minX: -6000, maxX: 9000, minY: -10000, maxY: 3500}
;

const havenCallouts: Converter =
  {minX: -14000, maxX: -850, minY: -5900, maxY: 8800}
;



