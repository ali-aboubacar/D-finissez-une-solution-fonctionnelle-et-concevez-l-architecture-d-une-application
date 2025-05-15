import { Component } from "@angular/core";
import { ToastType } from "src/app/_interfaces/toast";
import { ToastService } from "src/app/_services/toast.service";

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
    private messageField: string = '';
    private toastTypeField: ToastType = 'info'

    constructor(private toastService: ToastService){
        this.toastService.toastEvent.subscribe((data) => {
            this.messageField = data.message;
            this.toastTypeField = data.type
        })
    }

    public get message(){
        return this.messageField;
    }

    public get toastType(){
        return this.toastTypeField
    }
}