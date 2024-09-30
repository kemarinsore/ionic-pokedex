import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Storage } from '@ionic/storage-angular'; 
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  favorites: any[] = [];
  searchTerm: string = '';

  constructor(
    private pokemonService: PokemonService,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.storage.create(); 
    this.loadPokemon();
    this.loadFavorites();
  }

  loadPokemon() {
    this.pokemonService.getPokemon().subscribe((response: any) => {
      this.pokemons = response.results;
      this.filteredPokemons = this.pokemons; 
    });
  }

  filterPokemon() {
    this.filteredPokemons = this.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  capitalize(word: string): string {
    return word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
  }

  getPokeImage(index: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
  }

  goToDetail(url: string) {
    if (url) {
      this.navCtrl.navigateForward(`/detail/${encodeURIComponent(url)}`);
    } else {
      console.error('URL for the selected Pokémon is missing.');
    }
  }
  
  async loadFavorites() {
    this.favorites = (await this.storage.get('favorites')) || [];
    console.log('Loaded favorites:', this.favorites);
  }

  goToFavorite() {
    this.navCtrl.navigateForward('/favorite'); 
  }
}
