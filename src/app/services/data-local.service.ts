import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Restaurante} from '../interfaces/restaurante';
import {ToastController} from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class DataLocalService {

    restaurantes: Restaurante[] = [];

    constructor(private storage: Storage,
                public toastController: ToastController) {
        this.cargarFavoritos();
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

    guardarRestaurante(restaurante: Restaurante) {

        const existe = this.restaurantes.find(item => item.id === restaurante.id);

        if (!existe) {
            this.restaurantes.unshift(restaurante); // para agregar en la primera posicion
            this.storage.set('favoritos', this.restaurantes);
        }
        this.presentToast('Agregado a favoritos');
    }

    async cargarFavoritos() {
        const favoritos = await this.storage.get('favoritos');
        console.log(`favoritos`, favoritos);
        if (favoritos) {
            this.restaurantes = favoritos;
        }
    }

    borrarRestaurante(restaurante: Restaurante) {
        this.restaurantes = this.restaurantes.filter(item => item.id !== restaurante.id);
        this.storage.set('favoritos', this.restaurantes);
        this.presentToast('Eliminado de favoritos');
    }
}
