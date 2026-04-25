import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfissionalModel, ProfissionalService } from '../servicos/profissional';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-profissional',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './profissional.html',
  styleUrl: './profissional.css',
})
export class Profissional {
 formProfissional!: FormGroup;
 profissionalList: ProfissionalModel[] = [];
 idSelecionado: number = 0 ;

 constructor (
  private fb: FormBuilder,
  private profissonalService: ProfissionalService,
 ) {}

 ngOnInit(): void {
   this.limparFormulario()
   this.profissionalList = this.profissonalService.getAll()
 }

 onSubmit(): void {
  if (this.formProfissional.valid) {
    if (this.idSelecionado != 0) {
      this.profissonalService.update(this.idSelecionado, this.formProfissional.value);
      this.idSelecionado = 0;
    } else {
      this.profissonalService.create(this.formProfissional.value);
    }

    this.limparFormulario();

    this.profissionalList= this.profissonalService.getAll()
    console.log('LISTA ATUAL:', this.profissionalList);
  }
 }

 selecionarId(id:number):void {
  this.idSelecionado = id
  this.carregarFormulario();
 }

 onExcluir(): void{
  this.profissonalService.delete(this.idSelecionado)
  this.profissionalList = this.profissonalService.getAll()
  this.limparFormulario();
 }
 
 limparFormulario(): void {
  this.formProfissional = this.fb.group({
    nome: ['', Validators.required],
    cpf:['', Validators.required],
    email: ['', Validators.required],
    telefone: ['', Validators.required],
    sexo: ['', Validators.required],
  })
 }
 carregarFormulario(): void {
  const profissional = this.profissonalService.getById(this.idSelecionado)

  this.formProfissional = this.fb.group({
    nome: [profissional?.nome, Validators.required],
    cpf: [profissional?.cpf, Validators.required],
    email: [profissional?.email, Validators.required],
    telefone: [profissional?.telefone, Validators.required],
    sexo: [profissional?.sexo, Validators.required],

  });
 }
}


