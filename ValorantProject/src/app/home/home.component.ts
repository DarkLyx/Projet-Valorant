import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { Agent } from '../agent';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  
  
  apiservice = inject(AppService);

  agents: Agent[] = [];
  // maps: Map[]= [];
  currentAgentIndex = 0;
  currentMapIndex = 0;

//ca t enleve une fois que t as récupe ta data


  ngOnInit() : void {

    this.apiservice.getAgents().pipe(
      map((agents: Agent[]) => agents)
    ).subscribe((agents: Agent[]) => {
      this.agents = agents;
    });

    //récupe ta data
    // this.apiservice.getMaps().pipe(
    //   map((maps: Map[]) => maps)
    // ).subscribe((maps: Map[]) => {
    //   this.maps = maps;
    // });
    

    }
    get currentAgent() 
    {
        return this.agents[this.currentAgentIndex];
    }
    
  // currentMap(){
  //   return this.maps[this.currentMapIndex];
  // }
    prevAgent()
    {
        this.currentAgentIndex = (this.currentAgentIndex - 1 + this.agents.length) % this.agents.length;
    }
    
    nextAgent() 
    {
        this.currentAgentIndex = (this.currentAgentIndex + 1) % this.agents.length;
    }
     
   // faire la meme fonctions que ce que j'ai fais pour agent avec les prevMap et nextMap
    //aussi une fois que c'est fait décommente sur le html les buttons
    //normalement après t as les caroussel
    
    // prevMap()
    // {
    //   this.currentMapIndex = (this.currentMapIndex - 1 + this.maps.length) % this.maps.length;
    // }
    
    // nextMap() 
    // {
    //   this.currentMapIndex = (this.currentMapIndex + 1) % this.maps.length;
    // }
   
}



