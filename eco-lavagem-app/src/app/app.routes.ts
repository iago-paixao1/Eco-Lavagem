import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('../dashboard/dashboard').then(m => m.DashboardComponent),
  },
  {
    path: 'layout',
    title: 'Página Inicial',  
    loadComponent: () => import('../layout/layout').then(m => m.LayoutComponent),
  },
  {
    path: 'agendamento',
    title: 'Agendamentos',
    loadComponent: () => import('../agendamento/agendamento').then(m => m.Agendamento),
  },
  {
    path: 'profissional',
    title: 'Profissionais',
    loadComponent: () => import('../profissional/profissional').then(m => m.Profissional),
  },
  {
    path: 'login',
    title: 'Tela de Login',
    loadComponent: () => import('../login/login').then((m) => m.LoginComponent),
  },
  
  {
    path: 'p-servicos',
    title: 'Serviços',
    loadComponent: () => import('../p-servicos/p-servicos').then((m) => m.PServicos),
  },
  
  { path: '**', redirectTo: 'layout' }, // rota coringa para redirecionar páginas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
