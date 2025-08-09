import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({ providedIn: 'root' })
export class ToastMessageService {
    constructor(private http: HttpClient) {}

    toast$ = new Subject<{ message: string; type: ToastType }>();

    showSuccess(message: string) {
        this.toast$.next({message, type: 'success'});
    }

    showError(message: string) {
        this.toast$.next({message, type: 'error'});
    }

    showWarning(message: string) {
        this.toast$.next({message, type: 'warning'});
    }

    showInfo(message: string) {
        this.toast$.next({message, type: 'info'});
    }
}