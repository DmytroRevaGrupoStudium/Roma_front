import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
  products = [
    { id: 1, name: 'Camiseta Gema First Edition', description: 'Camiseta con diseño simple de tatuaje de Gema', img: 'https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C91Ed%2BM21Q7L.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX679_.png', precio: '15€', tipo: 'Camisetas'},
    { id: 2, name: 'Sudadera Gema First Edition', description: 'Sudadera con diseño simple de tatuaje de Gema', img: 'https://m.media-amazon.com/images/I/B1Wsm-8LxOS._CLa%7C2140%2C2000%7CB1UmBdOyB-L.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX342_SY445_.png', precio: '20€', tipo: 'Sudaderas'},
    { id: 3, name: 'Camiseta Old School', description: 'Camiseta Old School con diseño personalizado', img: 'https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C8188h5m-pEL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX679_.png', precio: '30€', tipo: 'Camisetas'},
    { id: 4, name: 'Gorra Old School', description: 'Gorra con diseño Old School', img: 'https://m.media-amazon.com/images/I/91NgDj08E8L._AC_SX679_.jpg', precio: '100€', tipo: 'Gorras'}
  ];
}
