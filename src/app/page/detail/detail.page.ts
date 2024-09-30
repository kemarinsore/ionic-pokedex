import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Storage } from '@ionic/storage-angular'; 
import { NavController } from '@ionic/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, AfterViewInit {
  pokemon: any; 
  favorites: any[] = []; 
  isFavorite: boolean = false; 
  storage: Storage; 

  constructor(
    private route: ActivatedRoute, 
    private pokemonService: PokemonService,
    private navCtrl:  NavController, 
    storage: Storage 
  ) {
    this.storage = storage; 
  }

  async ngOnInit() {
    await this.storage.create(); 
    const url = this.route.snapshot.paramMap.get('url');
    if (url) {
      this.loadPokemonDetails(decodeURIComponent(url));
    } else {
      console.error('URL parameter is missing');
      this.navCtrl.navigateBack('/home'); // Optional navigation if URL is missing
    }
    this.loadFavorites();
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  loadPokemonDetails(url: string) {
    this.pokemonService.getPokemonDetails(url).subscribe((response: any) => {
      this.pokemon = response;
      this.checkIfFavorite(); 
      console.log('Pokemon details:', this.pokemon);
    });
  }
  

  capitalize(word: string): string {
    if (!word) return ''; 
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  async loadFavorites() {
    this.favorites = (await this.storage.get('favorites')) || [];
    if (this.pokemon && this.pokemon.id) {
      this.checkIfFavorite();
    }
  }

  checkIfFavorite() {
    if (!this.pokemon || !this.pokemon.id) {
      console.error('Pokemon or Pokemon ID is undefined.');
      return;
    }
    this.isFavorite = this.favorites.some((fav: { id: number }) => fav.id === this.pokemon.id);
  }
  
  
  async toggleFavorite() {
    const currentFavorites = (await this.storage.get('favorites')) || [];
    const isFavoriteAlready = currentFavorites.some((fav: { id: number }) => fav.id === this.pokemon.id);

    if (isFavoriteAlready) {
      this.favorites = currentFavorites.filter((fav: { id: number }) => fav.id !== this.pokemon.id);
    } else {
      this.favorites.push({
        id: this.pokemon.id,
        name: this.pokemon.name,
        url: `https://pokeapi.co/api/v2/pokemon/${this.pokemon.id}/`
      });
    }
    await this.storage.set('favorites', this.favorites);
    this.checkIfFavorite(); 
  }
}
