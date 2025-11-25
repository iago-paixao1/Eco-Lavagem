import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('../dashboard/dashboard').then(m => m.DashboardComponent),
  },
  {
    path: 'layout',
    loadComponent: () => import('../layout/layout').then(m => m.LayoutComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('../login/login').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: 'dashboard' }, // rota coringa para redirecionar páginas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
