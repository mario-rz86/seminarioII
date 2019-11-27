import {Component, Input, OnInit} from '@angular/core';
import {Restaurante} from '../../interfaces/restaurante';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss'],
})
export class RestaurantesComponent implements OnInit {

  @Input() restaurantes: Restaurante[] = [];
  @Input() enFavoritos = false;

  constructor() { }

  ngOnInit() {}

}
