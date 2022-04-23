import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChampionsComponent } from './champions/champions.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ChampionDetailsComponent } from './champions/champion-details/champion-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { UserStatsComponent } from './user-stats/user-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChampionsComponent,
    FavoritesComponent,
    ChampionDetailsComponent,
    HomeComponent,
    FilterPipe,
    UserStatsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
