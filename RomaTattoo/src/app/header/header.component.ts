import { Component } from '@angular/core';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  companyName: String = '';

  constructor(
    private infoService: InfoService,
  ) {
    this.companyName = infoService.companyName;
  }
}
