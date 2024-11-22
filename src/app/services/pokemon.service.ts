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

// {
//   "abilities": [
//     {
//       "ability": {
//         "name": "static",
//         "url": "https://pokeapi.co/api/v2/ability/9/"
//       },
//       "is_hidden": false,
//       "slot": 1
//     },
//     {
//       "ability": {
//         "name": "lightning-rod",
//         "url": "https://pokeapi.co/api/v2/ability/31/"
//       },
//       "is_hidden": true,
//       "slot": 3
//     }
//   ],
//  "name": "pikachu",
//   "order": 35,
//   "past_abilities": [],
//   "past_types": [],
//   "species": {
//     "name": "pikachu",
//     "url": "https://pokeapi.co/api/v2/pokemon-species/25/"
//   },
//  {
//   "abilities": [
//     {
//       "ability": {
//         "name": "static",
//         "url": "https://pokeapi.co/api/v2/ability/9/"
//       },
//       "is_hidden": false,
//       "slot": 1
//     },
//     {
//       "ability": {
//         "name": "lightning-rod",
//         "url": "https://pokeapi.co/api/v2/ability/31/"
//       },
//       "is_hidden": true,
//       "slot": 3
//     }
//   ],
 
 
//  "stats": [
//     {
//       "base_stat": 35,
//       "effort": 0,
//       "stat": {
//         "name": "hp",
//         "url": "https://pokeapi.co/api/v2/stat/1/"
//       }
//     },
//     {
//       "base_stat": 55,
//       "effort": 0,
//       "stat": {
//         "name": "attack",
//         "url": "https://pokeapi.co/api/v2/stat/2/"
//       }
//     },
//     {
//       "base_stat": 40,
//       "effort": 0,
//       "stat": {
//         "name": "defense",
//         "url": "https://pokeapi.co/api/v2/stat/3/"
//       }
//     },
//     {
//       "base_stat": 50,
//       "effort": 0,
//       "stat": {
//         "name": "special-attack",
//         "url": "https://pokeapi.co/api/v2/stat/4/"
//       }
//     },
//     {
//       "base_stat": 50,
//       "effort": 0,
//       "stat": {
//         "name": "special-defense",
//         "url": "https://pokeapi.co/api/v2/stat/5/"
//       }
//     },
//     {
//       "base_stat": 90,
//       "effort": 2,
//       "stat": {
//         "name": "speed",
//         "url": "https://pokeapi.co/api/v2/stat/6/"
//       }
//     }
//   ],
//   "types": [
//     {
//       "slot": 1,
//       "type": {
//         "name": "electric",
//         "url": "https://pokeapi.co/api/v2/type/13/"
//       }
//     }
//   ],
//   "weight": 60
//  }
 
