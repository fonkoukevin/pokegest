import { PokemonService } from './../pokemon.service';
import { Pokemon } from './../pokemon';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [FormsModule,CommonModule,PokemonTypeColorPipe],
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  type: string[];
  constructor(private pokemonService: PokemonService, private router:Router) { }

  ngOnInit() {
    this.type = this.pokemonService.getPokemonTypeList();
  }

  hasType(typ: string): boolean {
    return this.pokemon.type.split(',').includes(typ);
  }
 
  selectType($event: Event, typ: string) {
    const ischecked: boolean = ($event.target as HTMLInputElement).checked;

    if (ischecked) {
      this.pokemon.type.split(',').push(typ);
    }else{
      const index = this.pokemon.type.split(',').indexOf(typ);
      this.pokemon.type.split(',').splice(index, 1);
    }

  }

  onSubmit(){
    console.log("Submit form !");
    this.router.navigate(["/pokemon", this.pokemon.id]);
  }

  isTypesValid(typ: string): boolean{
      if(this.pokemon.type.split(',').length ==1 && this.hasType(typ)){
        return false;
      }
      if(this.pokemon.type.split(',').length >2 && !this.hasType(typ)){
        return false;
      }

      return true; 
  }



}
