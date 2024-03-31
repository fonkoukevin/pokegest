import { Injectable, OnInit } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
// import { POKEMONS } from './mock-pokemon-list';
import { DogApiService } from './dog-api.service';

@Injectable({
  providedIn: 'root',
})

export class PokemonService implements OnInit {

  constructor(private http: HttpClient,private pokemonApiService: DogApiService ) { }

  // getPokemonList(): Observable<Pokemon[]> {
  //   return this.http.get<Pokemon[]>('api/pokemons',{ responseType: 'json' }).pipe(
  //     tap((response) => this.log(response)),
  //     catchError((error)=> this.handleError(error, []))
  //   );
  // }


  // getPokemonList(): Observable<Pokemon[]> {
  //   return this.http.get('api/pokemons', { responseType: 'json' }).pipe(
  //     tap((response) => this.log(response)),
  //     catchError((error) => this.handleError(error, []))
  //   );
  // }
  
  // getPokemonList(): Pokemon[]{
  //   return POKEMONS;
  // }
  pokemonList: any[] = [];


  ngOnInit(): void {
    this.getPokemonList();
    
  }
  getPokemonList() {
    // pokemonList
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
    return this.pokemonList;
  }

  // getPokemonById(pokemonId: string): any| undefined{
  //   console.log(this.getPokemonList())
  //   return this.getPokemonList().find(pokemon => pokemon.name == pokemonId)

  // }
  // getPokemonById(pokemonname: string): any | undefined {
  //   console.log(this.getPokemonList().find(pokemon => pokemon.id === ("ivysaur")))
  //   return this.getPokemonList().find(pokemon => pokemon.id === parseInt(pokemonname));
  // }
   
  getPokemonById(pokemonName: string): any | undefined {
    console.log(this.getPokemonList().find(pokemon => "ivysaur" === "ivysaur"))
    // window.location.reload();
    return this.getPokemonList().find(pokemon => pokemon.name === pokemonName);
  }
  // console.log()
  
  
  // getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
  //   return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
  //     tap((response) => this.log(response)),
  //     catchError((error)=> this.handleError(error, undefined))
  //   );
  // }

  // private log(response: Pokemon[] | Pokemon | undefined) {
  //   console.table(response);
  // }


  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue)
  }




  getPokemonTypeList(): string[] {
    return [
      "grass", "fire", "water", "bug", "normal", "electric", "poison", "fairy", "flying", "ground", "Psy"
    ];


  }
}

