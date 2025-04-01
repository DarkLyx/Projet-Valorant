import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Agent } from './agent';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  httpClient=inject(HttpClient);
  constructor() { }


    getAgents(): Observable<Agent[]> {
      return this.httpClient.get<any>('https://valorant-api.com/v1/agents').pipe(
        map(data => data.data),
        map(data =>
          data
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

    getAgentbyId(id:string): Observable<Agent>{
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

}
