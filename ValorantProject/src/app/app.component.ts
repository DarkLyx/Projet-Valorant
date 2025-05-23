import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {    // Test de base pour tester l'API au début du projet (ça remonte)
  title = 'ValorantProject';

  apiservice = inject(AppService);
  ngOnInit() : void {
    // Code to be executed on component initialization
    this.apiservice.getAgents().subscribe((data) => {
      console.log(data);
    })
  }
}