import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) {}

  getPokemon(offset: number = 0, limit: number = 125): Observable<any> {
    const url = `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`;  
    return this.http.get(url);
}


  getPokeImage(index: number): string {
    return `${this.imageUrl}${index}.png`; 
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url); 
  }
  
}
