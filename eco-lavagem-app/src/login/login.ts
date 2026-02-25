// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var bootstrap: any; // usa o bundle do bootstrap incluido em index.html

@Component({
    selector: 'app-login',
     standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  recoverForm!: FormGroup;
  showPw = false;

  constructor(private fb: FormBuilder,private router:Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
    });

    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() { return this.loginForm.get('email')!; }
  get recoverEmail() { return this.recoverForm.get('email')!; }

  togglePw() {
    this.showPw = !this.showPw;
  }

  onLogin() {
    console.log('Login', this.loginForm.value);
    if (this.loginForm.invalid) return;
    // TODO: chamar API de autenticação
    this.router.navigate(['/dashboard'])
  }


  openRecoverModal(event?: Event) {
    if (event) event.preventDefault();
    const modalEl = document.getElementById('recoverModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  onRecover() {
    if (this.recoverForm.invalid) return;
    // TODO: disparar requisição de recuperação
    console.log('Recuperar senha para', this.recoverForm.value.email);
    // fechar modal automaticamente
    const modalEl = document.getElementById('recoverModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();
    // feedback (ex: toaster) aqui
    alert('Instruções enviadas para o seu e-mail (simulação).');
  }
}
