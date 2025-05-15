import { EventEmitter, Injectable } from "@angular/core";
import { ToastEvent, ToastType } from "../_interfaces/toast";

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    toastEvent: EventEmitter<ToastEvent> = new EventEmitter();

    showToast( message: string, type: ToastType ){
        this.toastEvent.emit({message, type})
        setTimeout(() => {
            this.hideToast();
        }, 3000)
    }

    hideToast(){
        this.toastEvent.emit({message:'', type: 'info'})
    }
}