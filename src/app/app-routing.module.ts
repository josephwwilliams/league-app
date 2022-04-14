import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChampionDetailsComponent } from "./champions/champion-details/champion-details.component";
import { ChampionsComponent } from "./champions/champions.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'champions', component: ChampionsComponent},
  { path: 'favorites', component: FavoritesComponent },
  { path: 'champions/details', component: ChampionDetailsComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
