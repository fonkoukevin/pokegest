
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
// import { InMemoryDataService } from "./in-memory-data.service";
import { HttpClientModule } from "@angular/common/http";




const routes: Routes =[
   
];

@NgModule({
    imports: [RouterModule.forRoot(routes),
    // HttpClientInMemoryWebApiModule.forRoot({dataEncapsulation: false}),
    HttpClientModule
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }