import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RestaurantesComponent} from './restaurantes/restaurantes.component';
import {RestauranteComponent} from './restaurante/restaurante.component';


@NgModule({
    declarations: [
        RestaurantesComponent,
        RestauranteComponent
    ],
  imports: [
    CommonModule,
    IonicModule
  ],
    exports: [
        RestaurantesComponent,
        RestauranteComponent
    ]
})
export class ComponentsModule {
}
