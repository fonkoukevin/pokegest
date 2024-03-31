import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { HttpClientModule } from '@angular/common/http';
import { DogApiService } from '../dog-api.service';

@Component({
  selector: 'app-edit-pokemon',
  standalone: true,
  imports: [CommonModule,PokemonFormComponent,HttpClientModule],
  template: `
      <h2 class="center">Editer {{pokemon.name}} </h2>
      <p *ngIf = "pokemon" class="center">
        <img [src] = "pokemon.image">
      </p>
      <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon" ></app-pokemon-form>
  `,
  styles: ``
})
export class EditPokemonComponent implements OnInit {

  pokemon: any;
  pokemonList: any[] = [];

  constructor(private route:ActivatedRoute, private pokemonService:PokemonService, private pokemonApiService: DogApiService) {
    
  }

  ngOnInit(){

    const pokemonId: string|null = this.route.snapshot.paramMap.get("name");

    if(pokemonId){
    //  this.pokemonService.getPokemonById(+pokemonId).subscribe(pokemon =>this.pokemon=pokemon);
      this.pokemon = this.pokemonService.getPokemonById(pokemonId)
      console.log(this.pokemon)
    }
    else{
      this.pokemon = undefined;
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
