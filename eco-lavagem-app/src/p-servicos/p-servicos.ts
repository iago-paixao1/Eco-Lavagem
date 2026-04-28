import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PServicosModel, PServicoservice } from '../servicos/p-servicos';

@Component({
  selector: 'app-p-servicos',
  imports: [ReactiveFormsModule],
  providers: [provideNgxMask()],
  templateUrl: './p-servicos.html',
  styleUrl: './p-servicos.css',
})
export class PServicos {
  formServicos!: FormGroup;
  servicosList: PServicosModel[] = [];
  idSelecionado: number = 0;

  constructor(
    private fb: FormBuilder,
    private pServicosservice: PServicoservice,
  ) {}

  ngOnInit(): void {
    this.limparFormulario();
    this.servicosList = this.pServicosservice.getAll();
  }

  onSubmit(): void {
    if (this.formServicos.valid) {
      if (this.idSelecionado != 0) {
        this.pServicosservice.update(this.idSelecionado, this.formServicos.value);
        this.idSelecionado = 0;
      } else {
        this.pServicosservice.create(this.formServicos.value);
      }

      this.limparFormulario();

      this.servicosList = this.pServicosservice.getAll();
      console.log('LISTA ATUAL:', this.servicosList);
    }
  }

  selecionarId(id: number): void {
    this.idSelecionado = id;
    this.carregarFormulario();
  }

  onExcluir(): void {
    this.pServicosservice.delete(this.idSelecionado);
    this.servicosList = this.pServicosservice.getAll();
    this.limparFormulario();
  }

  limparFormulario(): void {
    this.formServicos = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      tempo: ['', Validators.required],
    });
  }
  carregarFormulario(): void {
    const servicos = this.pServicosservice.getById(this.idSelecionado);

    this.formServicos = this.fb.group({
      nome: [servicos?.nome, Validators.required],
      descricao: [servicos?.descricao, Validators.required],
      preco: [servicos?.preco, Validators.required],
      tempo: [servicos?.tempo, Validators.required],
    });
  }
}
