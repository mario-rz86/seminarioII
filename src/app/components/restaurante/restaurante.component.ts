import {Component, Input, OnInit} from '@angular/core';
import {Restaurante} from '../../interfaces/restaurante';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {ActionSheetController} from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {DataLocalService} from '../../services/data-local.service';

@Component({
    selector: 'app-restaurante',
    templateUrl: './restaurante.component.html',
    styleUrls: ['./restaurante.component.scss'],
})
export class RestauranteComponent implements OnInit {

    @Input() restaurante: Restaurante;
    @Input() nro: number;
    @Input() enFavoritos;

    constructor(private iab: InAppBrowser,
                private actionSheetController: ActionSheetController,
                private socialSharing: SocialSharing,
                private dataLocalService: DataLocalService) {
    }

    ngOnInit() {
    }

    abrirRestaurante() {
        const browser = this.iab.create(this.restaurante.url, '_system');
    }

    async lanzarMenu() {

        let borrarBtn;
        if (this.enFavoritos) {
            borrarBtn = {
                text: 'Borrar Favorito',
                icon: 'trash',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Borrar Favorito');
                    this.dataLocalService.borrarRestaurante(this.restaurante);
                }
            };
        } else {
            borrarBtn = {
                text: 'Favorito',
                icon: 'star',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Favorito');
                    this.dataLocalService.guardarRestaurante(this.restaurante);
                }
            };
        }

        const actionSheet = await this.actionSheetController.create({
            buttons: [
                {
                    text: 'Compartir',
                    icon: 'share',
                    cssClass: 'action-dark',
                    handler: () => {
                        console.log('Share clicked');
                        this.socialSharing.share(
                            this.restaurante.nombre,
                            this.restaurante.direccion,
                            null, // file
                            this.restaurante.url
                        );
                    }
                },
                borrarBtn,
                {
                    text: 'Cancelar',
                    icon: 'close',
                    cssClass: 'action-dark',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
        });
        await actionSheet.present();
    }
}
