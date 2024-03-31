import { Routes } from '@angular/router';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';



export const routes: Routes = [
    {path: "edit/pokemon/:name", component: EditPokemonComponent},
    {path: "pokemons", component: ListPokemonComponent},
    {path: "pokemon/:name", component: DetailPokemonComponent },
    {path: "", redirectTo: "pokemons",pathMatch: "full"},    //pathmatch pour eviter les effects de bord pour que ca soit vraiment identique.  indique juste que quand le path est "" alors on doit ce redirectione vers le lien /pokemons
    {path: "**", component: PageNotFoundComponent}
];
  
