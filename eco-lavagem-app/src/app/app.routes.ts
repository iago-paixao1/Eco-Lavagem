
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard';
import { LayoutComponent } from '../layout/layout';
import {LoginComponent } from '../login/login';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'login',
    loadComponent: () => import('../login/login').then(m => m.LoginComponent)
   },
  { path: '**', redirectTo: 'dashboard' } // rota coringa para redirecionar páginas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserModule,FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
