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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ChampionDialogComponent } from './champions/champion-details/champion-dialog/champion-dialog.component';
import { CooldownPipe } from './pipes/cooldown.pipe';

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
    ChampionDialogComponent,
    CooldownPipe,
  ],
  entryComponents: [ChampionDialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
