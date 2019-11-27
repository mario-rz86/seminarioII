import {Component, OnInit, ViewChild} from '@angular/core';
import {RestaurantesService} from '../../services/restaurantes.service';
import {Restaurante} from '../../interfaces/restaurante';
import {IonSegment} from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    restaurantes: Restaurante[] = [];
    categorias: any[] = [];
    restaurantesFilter: Restaurante[] = [];

    @ViewChild(IonSegment, null) segment: IonSegment;

    constructor(private restaurantesService: RestaurantesService) {
    }

    ngOnInit(): void {
        this.restaurantesService.getRestaurantes().subscribe(resp => {
            if (resp.estado === 0) {
                this.restaurantes = resp.data;
            }
        });

        this.restaurantesService.getCategorias().subscribe(resp => {
            if (resp.estado === 0) {
                this.categorias = resp.data;
                this.segment.value = this.categorias[0].nombre;

                // obtener los restaurantes de la categoria seleccionada
                this.getRestaurantesByCategoria(this.categorias[0].nombre);
            }
        });
    }

    getRestaurantesByCategoria(categoria: string) {
        console.log(`categoria: ` + categoria);
        this.restaurantesFilter = this.restaurantes.filter(item => item.categoria === categoria);
        console.log(`this.restaurantesFilter`, this.restaurantesFilter);
    }

    cambioCategoria(event) {
        this.getRestaurantesByCategoria(event.detail.value);
    }
}
