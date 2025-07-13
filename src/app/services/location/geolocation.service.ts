import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
    constructor(private http: HttpClient) {}

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
}