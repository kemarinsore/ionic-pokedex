import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favorites: any[] = [];

  constructor(
    private storage: Storage, 
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadFavorites(); 
  }

  async loadFavorites() {
    this.favorites = (await this.storage.get('favorites')) || [];
    console.log('Loaded favorites:', this.favorites);
  }

  ionViewWillEnter() {
    this.loadFavorites(); 
  }

  capitalize(word: string): string {
    return word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
  }

  getPokeImage(pokemonId: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }

  goToDetail(url: string) {
    if (url) {
      this.navCtrl.navigateForward(`/detail/${encodeURIComponent(url)}?fromFavorite=true`);
    } else {
      console.error('URL for the selected Pokémon is missing.');
    }
  }


  async addToFavorites(pokemon: any) {
    const currentFavorites = (await this.storage.get('favorites')) || [];
    
    const isFavoriteAlready = currentFavorites.some((fav: { id: number }) => fav.id === pokemon.id);
  
    if (!isFavoriteAlready) {
      currentFavorites.push({
        id: pokemon.id,
        name: pokemon.name,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
      });
      await this.storage.set('favorites', currentFavorites);
    }
  }
  
  async deleteFavorite(index: number, event: Event) {
    event.stopPropagation(); 
    this.favorites.splice(index, 1); 
    await this.storage.set('favorites', this.favorites); 
    console.log('Favorite deleted:', this.favorites);
  }

  goToHome() {
    this.navCtrl.navigateForward('/home'); 
  }
}
