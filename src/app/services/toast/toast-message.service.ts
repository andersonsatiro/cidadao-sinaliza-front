import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({ providedIn: 'root' })
export class ToastMessageService {
    constructor(private http: HttpClient) {}

    toast$ = new Subject<{ message: string; type: ToastType, extraTime?: number }>();

    showSuccess(message: string, extraTime?: number) {
        this.toast$.next({message, type: 'success', extraTime});
    }

    showError(message: string, extraTime?: number) {
        this.toast$.next({message, type: 'error', extraTime});
    }

    showWarning(message: string, extraTime?: number) {
        this.toast$.next({message, type: 'warning', extraTime});
    }

    showInfo(message: string, extraTime?: number) {
        this.toast$.next({message, type: 'info', extraTime});
    }
}