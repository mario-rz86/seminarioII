import {Component, OnInit} from '@angular/core';
import {RestaurantesService} from '../../services/restaurantes.service';
import {Restaurante} from '../../interfaces/restaurante';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    restaurantes: Restaurante[] = [];

    constructor(private restaurantesService: RestaurantesService) {
    }

    ngOnInit(): void {
        this.restaurantesService.getRestaurantes().subscribe(resp => {
            console.log('restaurantes: ', resp);

            if (resp.estado === 0) {
                this.restaurantes = resp.data;
            }
        });
    }
}
