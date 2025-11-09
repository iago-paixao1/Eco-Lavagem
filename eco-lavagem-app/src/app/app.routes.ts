
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard';
import { LayoutComponent } from '../layout/layout';
import {LoginComponent } from '../login/login';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'dashboard' } // rota coringa para redirecionar páginas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
