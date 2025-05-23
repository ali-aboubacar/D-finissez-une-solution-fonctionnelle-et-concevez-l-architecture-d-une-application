import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { authGuard } from './_helpers/auth.guard';
import { ChatComponent } from './chat/chat.component';
import { RouterModule, Routes } from '@angular/router';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  {path: '', component: ChatComponent, canActivate: [authGuard]},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
