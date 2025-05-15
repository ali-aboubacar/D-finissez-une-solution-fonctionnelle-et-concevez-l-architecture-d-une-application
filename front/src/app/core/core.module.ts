import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ToastComponent } from "./toast/toast.component";
import { HeaderComponent } from "./header/header.component";


@NgModule({
    declarations: [
        PageNotFoundComponent,
        ToastComponent,
        HeaderComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
    ],
    exports: [
        PageNotFoundComponent,
        ToastComponent,
        HeaderComponent
    ]
})
export class CoreModule {}