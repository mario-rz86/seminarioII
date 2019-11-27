import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseDto} from '../interfaces/responseDto';
import {Restaurante} from '../interfaces/restaurante';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RestaurantesService {

    constructor(private httpClient: HttpClient) {
    }

    getRestaurantes() {
        // return this.httpClient.get<ResponseDto>(`http://localhost:8080/restaurantes`);
        // return this.httpClient.get<ResponseDto>(`https://restaurantes.ekeepoit.com/restaurantes`);
        return this.httpClient.get<ResponseDto>(`/assets/mocks/restaurantes.json`);
    }

    getCategorias() {
        return this.httpClient.get<ResponseDto>(`/assets/mocks/categorias.json`);
    }

    postRestaurante(r: Restaurante): Observable<ResponseDto> {
        return this.httpClient.post<ResponseDto>( `http://localhost:8083/restaurantes`, r).
        pipe(
            retry(1),
            catchError(this.errorHandl));
    }

    // Error handling
    errorHandl( error ) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}
