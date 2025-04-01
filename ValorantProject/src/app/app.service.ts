import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Map } from './map';
import { Callout } from './callout';
import { Agent } from './agent';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  httpClient = inject(HttpClient);
  constructor() { }

  getAgents(): Observable<Agent[]> {
    return this.httpClient.get<any>('https://valorant-api.com/v1/agents').pipe(
      map(data => data.data),
      map(data =>
        data.map((agent: any) => ({ 
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

  getMaps(): Observable<Map[]> {
    return this.httpClient.get('https://valorant-api.com/v1/maps').pipe(
      tap((data: any) => console.log("Raw API Data:", data)),
      map((response: any) => response.data),
      tap((maps: any[]) => console.log("Processed Maps:", maps)),
      map((maps: any[]) =>
        maps
          .filter(map => map.displayName !== "The Range")
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
}
