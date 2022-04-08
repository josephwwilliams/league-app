import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChampsService {
  champions: string[] = []
  constructor() { }
}
