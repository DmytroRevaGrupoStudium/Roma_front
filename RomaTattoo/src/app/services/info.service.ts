import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  companyName: string = "Roma Tattoo's";
  constructor() { }
}
