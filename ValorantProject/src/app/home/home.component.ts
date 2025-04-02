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

  agents: Agent[] = [];
  maps: Map[]= [];
  currentAgentIndex = 0;
  currentMapIndex = 0;

  ngOnInit() : void {

      this.apiservice.getAgents().pipe(
        map((agents: Agent[]) => agents)
      ).subscribe((agents: Agent[]) => {
        this.agents = agents;
      });

      this.apiservice.getMaps().pipe(
        map((maps: Map[]) => maps)
      ).subscribe((maps: Map[]) => {
        this.maps = maps;
      });
      

    }
    get currentAgent() 
    {
        return this.agents[this.currentAgentIndex];
    }
    
    get currentMap(){
      return this.maps[this.currentMapIndex];
    }
    prevAgent()
    {
        this.currentAgentIndex = (this.currentAgentIndex - 1 + this.agents.length) % this.agents.length;
    }
    
    nextAgent() 
    {
        this.currentAgentIndex = (this.currentAgentIndex + 1) % this.agents.length;
    }
     
   
    prevMap()
    {
      this.currentMapIndex = (this.currentMapIndex - 1 + this.maps.length) % this.maps.length;
    }
    
    nextMap() 
    {
      this.currentMapIndex = (this.currentMapIndex + 1) % this.maps.length;
    }
   
}



