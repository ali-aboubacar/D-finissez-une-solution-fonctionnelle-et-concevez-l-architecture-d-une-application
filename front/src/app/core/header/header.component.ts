import { Component, OnInit } from "@angular/core";

import { ToastService } from "src/app/_services/toast.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{

    constructor(){}
    ngOnInit(): void {
    }

}