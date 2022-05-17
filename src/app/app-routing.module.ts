import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ChampionDetailsComponent } from './champions/champion-details/champion-details.component';
import { ChampionsComponent } from './champions/champions.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { UserSettingsComponent } from './user-stats/user-settings/user-settings.component';
import { UserStatsComponent } from './user-stats/user-stats.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'stats', component: UserStatsComponent },
  {
    path: 'champions',
    component: ChampionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: UserSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'champions/details',
    component: ChampionDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'champions/details/:id',
    component: ChampionDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
