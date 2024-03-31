import { PokemonService } from './../pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Pokemon } from '../pokemon';
import { CommonModule } from '@angular/common';
import { BorderCardDirective } from '../border-card.directive';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [CommonModule, BorderCardDirective,PokemonTypeColorPipe,RouterModule], // Assurez-vous d'avoir cette ligne
  templateUrl: './detail-pokemon.component.html',

})
export class DetailPokemonComponent implements OnInit{

  pokemonList: any;
  pokemon: Pokemon;
  needReload: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private PokemonService: PokemonService){     //ici on utlise route pour avoir accees a la route donc a l'url et activateroute permet de recuperer la route courante

  }

  

  ngOnInit(){
    // window.location.reload();

    let c = []|| [2,3]
    let mes = "f"
   // const pokemonId: string|null = this.route.snapshot.paramMap.get("id");
    
    // if(pokemonId){
    //   this.PokemonService.getPokemonById(+pokemonId).subscribe(pokemon =>this.pokemon=pokemon)
    // }
    

    const pokemonId: string|null = this.route.snapshot.paramMap.get('name');

    if(pokemonId){
      this.pokemon = this.PokemonService.getPokemonById(pokemonId);
      console.log(this.pokemon)
      console.log(pokemonId)
    }

    // if (typeof window !== 'undefined') {
    //   window.location.reload();
    // }
    // if (this.needReload) {
    //   // Vérifie si window est défini avant d'utiliser window.location.reload()
    //   if (typeof window !== 'undefined') {
    //     window.location.reload();
    //     console.log("yess")
    //     this.needReload = false;
    //   }
    // }
  
    // if(c.length == 0){
    //   if (typeof window !== 'undefined') {
    //     window.location.reload();
    //     console.log("yess")
    //     this.needReload = false;
    //     // c.push(6)
    //   }
    // }

    // if (this.needReload) {
    //   return;
    // }

    // if (window.performance) {
    //   if (performance.navigation.type === 1) {
    //     console.log('This page is reloaded');
    //     window.location.reload();
    //     this.needReload = true; // Définit needReload à true après le premier rechargement
    //   }
    // }
    // c.push(6)

  }
  

  goToPokemonList(){
    this.router.navigate(["/pokemons"]);
  }

  goToEditPokemon(pokemon: any){
    this.router.navigate(["/edit/pokemon/", pokemon.name])
  }
  mes = "pas vide"


  
}
