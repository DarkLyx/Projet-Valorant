import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-maps',
  imports: [],
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
}
