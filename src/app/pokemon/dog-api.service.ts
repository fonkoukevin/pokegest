// dog-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogApiService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

}
