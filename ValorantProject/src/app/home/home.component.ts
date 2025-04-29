import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { Agent } from '../agent';
import { map } from 'rxjs';
import { Map } from '../map';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  apiservice = inject(AppService);

  agents: Agent[] = [];  //Liste des agents pour le carrousel
  maps: Map[]= []; //Liste des maps pour le carrousel
  currentAgentIndex = 0; //Index de l'agent actuel
  currentMapIndex = 0; //Index de la map actuelle

  ngOnInit() : void {

      this.apiservice.getAgents().pipe(   //On récupère les agents de l'API
        map((agents: Agent[]) => agents)
      ).subscribe((agents: Agent[]) => {
        this.agents = agents;
      });

      this.apiservice.getMaps().pipe(     //On récupère les maps de l'API
        map((maps: Map[]) => maps)
      ).subscribe((maps: Map[]) => {
        this.maps = maps;
      });
      

    }
    get currentAgent() // On récupère l'agent actuel pour pouvoir cliquer dessus et rediriger par la suite 
    {
        return this.agents[this.currentAgentIndex];
    }
    
    get currentMap(){ // On récupère la map actuelle pour pouvoir cliquer dessus et rediriger par la suite
      return this.maps[this.currentMapIndex];
    }
    prevAgent()   // On va à l'agent précédent dans le carrousel
    {
        this.currentAgentIndex = (this.currentAgentIndex - 1 + this.agents.length) % this.agents.length;
    }
    
    nextAgent()  // On va à l'agent suivant dans le carrousel
    {
        this.currentAgentIndex = (this.currentAgentIndex + 1) % this.agents.length;
    }
     
   
    prevMap()   // On va à la map précédente dans le carrousel
    {
      this.currentMapIndex = (this.currentMapIndex - 1 + this.maps.length) % this.maps.length;
    }
    
    nextMap() // On va à la map suivante dans le carrousel
    {
      this.currentMapIndex = (this.currentMapIndex + 1) % this.maps.length;
    }
   
}



