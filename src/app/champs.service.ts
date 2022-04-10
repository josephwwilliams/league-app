import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChampsService {
  champions: string[] = ['Jax','Bax','Aatrox','Jinx','Jayce','jax','Jax','Bax','Aatrox','Jinx','Jayce','jax','Jax','Bax','Aatrox','Jinx','Jayce','jax','Jax','Bax','Aatrox','Jinx','Jayce','jax','Jax','Bax','Aatrox','Jinx','Jayce','jax','Jax','Bax','Aatrox','Jinx','Jayce','jax','Jax','Bax','Aatrox','Jinx','Jayce','jax',]
  favoriteChampions:string[] = []
  constructor() { }
}
