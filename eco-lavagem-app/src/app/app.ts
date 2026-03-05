import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { Menu } from "../menu/menu";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menu,],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('eco-lavagem-app');
  rotaAtual: string = '';

  constructor(private router: Router) {
    // Validando a rota atual para não renderizar o componente Menu para a rota 'login'
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.rotaAtual = this.router.url;
      });
  }

}
