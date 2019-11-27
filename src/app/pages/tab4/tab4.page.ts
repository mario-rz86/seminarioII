import {Component, OnInit} from '@angular/core';
import {RestaurantesService} from '../../services/restaurantes.service';
import {Restaurante} from '../../interfaces/restaurante';
import { Router} from '@angular/router';
import {ResponseDto} from '../../Interfaces/responseDto';

@Component({
    selector: 'app-tab4',
    templateUrl: 'tab4.page.html',
    styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {

    restaurante: Restaurante = {id: 0, nombre: '', direccion: '', descripcion: '', imagen: '', precio: '', categoria: '', url: ''};

    responseDto: ResponseDto = {estado: 0, message: '', data: ''};

    constructor(private restaurantesService: RestaurantesService) {
    }

    ngOnInit(): void {}

     addRestaurante() {
        console.log(this.restaurante.id);
        if (this.restaurante.id === 0) {

            this.restaurantesService.postRestaurante(this.restaurante).subscribe(
                data => {
                    console.log(data.data, 'test');
                }
            );
        }
     }
    /* addRestaurant(r: ResponseDto) {
        return this.restaurantesService.postRestaurante(r).subscribe();
    } */


}
