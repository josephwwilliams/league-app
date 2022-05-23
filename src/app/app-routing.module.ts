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
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  {
    path: 'stats',
    component: UserStatsComponent,
    data: { animation: 'stats' },
  },
  {
    path: 'champions',
    component: ChampionsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'champions' },
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
    data: { animation: 'favorites' },
  },
  {
    path: 'settings',
    component: UserSettingsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'settings' },
  },
  {
    path: 'champions/details',
    component: ChampionDetailsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'champions/details' },
  },
  {
    path: 'champions/details/:id',
    component: ChampionDetailsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'champions/details/:id' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
