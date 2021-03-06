import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
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
import { PlayerStatsComponent } from './user-stats/player-stats/player-stats.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { UserSettingsComponent } from './user-stats/user-settings/user-settings.component';
import { FavoritesFilterPipe } from './pipes/favorites-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChampionsComponent,
    FavoritesComponent,
    ChampionDetailsComponent,
    HomeComponent,
    FilterPipe,
    UserStatsComponent,
    ChampionDialogComponent,
    CooldownPipe,
    PlayerStatsComponent,
    AuthComponent,
    UserSettingsComponent,
    FavoritesFilterPipe,
  ],
  entryComponents: [ChampionDialogComponent, PlayerStatsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
