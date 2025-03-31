import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  httpClient=inject(HttpClient);
  constructor() { }

  getData(): Observable<any> {
    return this.httpClient.get('https://valorant-api.com/v1/agents')
  }
}
