import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastMessageService } from '../toast/toast-message.service';
import { map, Observable, of } from 'rxjs';
import { State } from '../../models/state.model';
import { City } from '../../models/city.model';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
    constructor(
        private http: HttpClient,
        private toastMessage: ToastMessageService
    ) {}

    async userPermittedLocationAccess(): Promise<boolean> {
        try {
            const PermissionStatus = await navigator.permissions.query({ name: 'geolocation' });
            return PermissionStatus.state === 'granted';
        } catch {
            return false;
        }
    }

    getUserCoordinates(): Promise<{ latitude: number; longitude: number }> {
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }),
                error => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            this.toastMessage.showError('Permissão de localização negada. Habilite o acesso à sua localização nas configurações do navegador para continuar.');
                            break;     
                        case error.POSITION_UNAVAILABLE:
                            this.toastMessage.showError('Não foi possível determinar sua localização no momento. Tente novamente em alguns instantes.');
                            break;
                        case error.TIMEOUT:
                            this.toastMessage.showError('A solicitação de localização demorou demais. Verifique sua conexão ou tente novamente.');
                            break;
                        default:
                            this.toastMessage.showError('Ocorreu um erro inesperado ao obter sua localização. Por favor, tente novamente.');
                            break;
                    }
                }
            );
        });
    }

    async getUserLocation(): Promise<{ latitude: number; longitude: number }> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                pos => resolve({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            }),
            err => reject(err)
            );
        });
    }

    getAddressFromCoords(lat: number, lon: number) {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
        return this.http.get(url);
    }

    getStatesFromBrazil(): Observable<State[]> {
        return this.http.get<State[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .pipe(
                map(data =>
                    data.map(state => ({
                        id: state.id,
                        sigla: state.sigla,
                        nome: state.nome,
                        regiao: {
                            id: state.regiao.id,
                            sigla: state.regiao.sigla,
                            nome: state.regiao.nome
                        }
                    }))
                )
            )
    }

    getCitiesFromState(stateId: number): Observable<City[]> {
        return this.http.get<any[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`)
            .pipe(
                map(data => data.map(city => ({
                    id: city.id,
                    nome: city.nome,
                    uf: {
                        id: city.microrregiao.mesorregiao.UF.id,
                        sigla: city.microrregiao.mesorregiao.UF.sigla,
                        nome: city.microrregiao.mesorregiao.UF.nome
                    },
                    regiao: {
                        id: city.microrregiao.mesorregiao.UF.regiao.id,
                        sigla: city.microrregiao.mesorregiao.UF.regiao.sigla,
                        nome: city.microrregiao.mesorregiao.UF.regiao.nome
                    }
                })))
            );
    }
}