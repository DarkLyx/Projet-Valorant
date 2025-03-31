import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ValorantProject';

  apiservice = inject(AppService);
  ngOnInit() : void {
    // Code to be executed on component initialization
    this.apiservice.getData().subscribe((data) => {
      console.log(data);
    })
  }
}