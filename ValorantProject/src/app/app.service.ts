import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Map } from './map';
import { Callout } from './callout';
import { Agent } from './agent';
import { MapInfo } from './map-info';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  httpClient = inject(HttpClient);
  constructor() { }

  getAgents(): Observable<Agent[]> { // On récupère la liste des agents
    // On fait une requête GET à l'API de Valorant pour récupérer les agents
    return this.httpClient.get<any>('https://valorant-api.com/v1/agents').pipe(
      map(data => data.data),
      map(data => data
      .filter((agent: any) => agent.isPlayableCharacter !== false)
      .map((agent: any) => ({ 
        id: agent.uuid,
        name: agent.displayName,
        role: agent.role?.displayName || 'Unknown',
        roleid: agent.role?.uuid || null,
        abilitiesIcon: agent.abilities?.map((ability: any) => ability.displayIcon) || [],
        abilitiesName: agent.abilities?.map((ability: any) => ability.displayName) || [],
        abilitiesDescription: agent.abilities?.map((ability: any) => ability.description) || [],
        image: agent.fullPortrait || '',
        smallIcon: agent.displayIconSmall || '',
        description: agent.description || 'No description available',
      }))
      )
    );
  }


  getMaps(): Observable<Map[]> { // On récupère la liste des maps
    // On fait une requête GET à l'API de Valorant pour récupérer les maps
    return this.httpClient.get('https://valorant-api.com/v1/maps').pipe(
      tap((data: any) => console.log("Raw API Data:", data)),
      map((response: any) => response.data),
      tap((maps: any[]) => console.log("Processed Maps:", maps)),
      map((maps: any[]) =>
        maps
          .filter(map => map.displayName !== "The Range" && map.displayName !== "Basic Training")
          .map(map => ({
            id: map.uuid,
            name: map.displayName,
            image: map.splash,
            callouts: map.callouts
              ? map.callouts.map((callout: any) => ({
                regionName: callout.regionName,
                superRegionName: callout.superRegionName,
                location: {
                  x: callout.location.x,
                  y: callout.location.y
                }
              }))
              : []
          }))
      )
    );
  }

  getAgentbyId(id:string): Observable<Agent>{ // On récupère un agent par son ID
    // On fait une requête GET à l'API de Valorant pour récupérer un agent par son ID
    return this.httpClient.get<any>(`https://valorant-api.com/v1/agents/${id}`).pipe(
      map(data => ({
        id: data.data.uuid,
        name: data.data.displayName,
        role: data.data.role?.displayName || 'Unknown',
        roleid: data.data.role?.uuid || null,
        abilitiesIcon: data.data.abilities?.map((ability: any) => ability.displayIcon) || [],
        abilitiesName: data.data.abilities?.map((ability: any) => ability.displayName) || [],
        abilitiesDescription: data.data.abilities?.map((ability: any) => ability.description) || [],
        image: data.data.fullPortrait || '',
        smallIcon: data.data.displayIconSmall || '',
        description: data.data.description || 'No description available',
      }))
    );
  }

  getMapById(id:string): Observable<MapInfo> { // On récupère une map par son ID
    // On fait une requête GET à l'API de Valorant pour récupérer une map par son ID
    return this.httpClient.get<any>(`https://valorant-api.com/v1/maps/${id}`).pipe(
      tap((data: any) => console.log("Raw Map Data:", data)),
      map((response: any) => response.data),
      map(response => ({
            id: response.uuid,
            name: response.displayName,
            miniMap: response.displayIcon,
            banniereHorizontal: response.listViewIcon,
            banniereVertical: response.listViewIconTall,
            background: response.premierBackgroundImage,
            background2: response.stylizedBackgroundImage,
            image: response.splash,
            callouts: response.callouts
              ? response.callouts.map((callout: any) => ({
                regionName: callout.regionName,
                superRegionName: callout.superRegionName,
                location: {
                  x: callout.location.x,
                  y: callout.location.y
                }
              }))
              : []
          })),
          tap((data: any) => console.log("Processed Map Info:", data)),
      );
  }

  getRandomAgent(): Observable<Agent> { // On récupère un agent aléatoire
    // On fait une requête GET à l'API de Valorant pour récupérer un agent aléatoire
    return this.httpClient.get<any>('https://valorant-api.com/v1/agents').pipe(
      map(data => data.data), // On récupère les données des agents
      map(data => data
        .filter((agent: any) => agent.isPlayableCharacter !== false) // Filtrer les agents jouables
        .map((agent: any) => ({ 
          id: agent.uuid,
          name: agent.displayName,
          role: agent.role?.displayName || 'Unknown',
          roleid: agent.role?.uuid || null,
          abilitiesIcon: agent.abilities?.map((ability: any) => ability.displayIcon) || [],
          abilitiesName: agent.abilities?.map((ability: any) => ability.displayName) || [],
          abilitiesDescription: agent.abilities?.map((ability: any) => ability.description) || [],
          image: agent.fullPortrait || '',
          smallIcon: agent.displayIconSmall || '',
          description: agent.description || 'No description available',
        }))
      ),
      map(agents => agents[Math.floor(Math.random() * agents.length)]) // Sélectionner un agent aléatoire dans le tableau
    );
  }
  

}
