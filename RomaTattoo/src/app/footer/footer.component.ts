import { Component } from '@angular/core';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  companyName: String = '';

  constructor(
    private infoService: InfoService,
  ) {
    this.companyName = infoService.companyName;
  }
}