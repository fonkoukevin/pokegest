
import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';
import { CommonModule } from '@angular/common';
import { BorderCardDirective } from './border-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DogApiService } from './dog-api.service';

 
@Component({

  selector: 'app-root',
  templateUrl: "app.component.html",
  standalone: true, // Ajoutez cette ligne
  //  standalone: true,  // Ajoutez cette ligne
    imports: [CommonModule, BorderCardDirective,PokemonTypeColorPipe,RouterModule,HttpClientModule], // Assurez-vous d'avoir cette ligne
})

export class AppComponent implements OnInit{

  pokemonList: any[] = [];

  constructor(private pokemonApiService: DogApiService) {}

  ngOnInit() {
    this.getPokemonList();
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



  // pokemonList = POKEMONS;
  // pokemonSelected: Pokemon|undefined;
    
  //  ngOnInit() {
  // //   //console.table(this.pokemonList)
  // //  // this.selectPokemon(this.pokemonList[0])
  // //  // console.log(POKEMONS);
  // }

  // selectPokemon(pokemonId:string) {
  //  // const index: number = +(event.target as HTMLInputElement).value;
  //  const pokemon: Pokemon|undefined = this.pokemonList.find(pokemon=>pokemon.id == +pokemonId)
  //  if(pokemon){
  //  console.log(`Vous avez clique sur le pokemon ${pokemon.name}`)
  //  this.pokemonSelected =pokemon
  //  }
  //  else{
  //   console.log("Vous avez demande un pokemon qui n'existe pas")
  //  this.pokemonSelected =pokemon
    
  //  }
  // }
