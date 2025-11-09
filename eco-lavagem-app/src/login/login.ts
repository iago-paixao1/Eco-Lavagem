import { routes } from './../app/app.routes';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  constructor(private routes: Router) {}

  onSubmit() {
    console.log('Login enviado');
    this.routes.navigate(['/layout']);
  }


}
