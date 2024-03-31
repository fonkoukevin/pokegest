import { DogApiService } from './../dog-api.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderCardDirective } from '../border-card.directive';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
// import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-list-pokemon',
  standalone: true,
  templateUrl: './list-pokemon.component.html',
  imports: [CommonModule, BorderCardDirective, PokemonTypeColorPipe, RouterModule], // Assurez-vous d'avoir cette ligne


})
export class ListPokemonComponent implements OnInit {
  // pokemonList: Pokemon[];


  // constructor(private router: Router, private pokemonService: PokemonService ,DogApiService) {

  // }

  needReload: boolean = false;


  constructor(private router: Router,private pokemonApiService: DogApiService) {}
  pokemonList: any[] = [];

  // ngOnInit(){
    
  //   this.pokemonList = this.pokemonService.getPokemonList();
   
  // }

  // ngOnInit() {
  //   this.pokemonService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList)
  // }

  goToPokemon(pokemon:any) {
    this.router.navigate(["/pokemon", pokemon.name])     //donc c'est du genre quand on aappel cette function c'est pour dire qu'on veut aller sur la page avec les url donner la en parametre
  }






  ngOnInit() {
    this.getPokemonList();

    if (this.needReload) {
      // Vérifie si window est défini avant d'utiliser window.location.reload()
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  
  }

  getPokemonList() {
    const offset = 0; // Index de départ des Pokémon
    const limit = 40; // Nombre de Pokémon à récupérer
    this.pokemonApiService.getPokemonList(offset, limit).subscribe(data => {
      const results = data.results;
      results.forEach((pokemon: any, index: number) => {
        this.pokemonApiService.getPokemonDetails(pokemon.url).subscribe(pokemonData => {
          const pokemonInfo = {
            id: index + 1, // ID du Pokemon
            name: pokemon.name,
            image: pokemonData.sprites.front_default,
            type: pokemonData.types.map((type: any) => type.type.name).join(', '),
            hp: pokemonData.stats[0].base_stat,
            attack: pokemonData.stats[1].base_stat
          };
          this.pokemonList.push(pokemonInfo);
        });
      });
    });
  }
}