import { Component } from '@angular/core';
import { AgendamentoModel, AgendamentoService } from '../servicos/agendamento';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agendamento',
  imports: [ReactiveFormsModule],
  templateUrl: './agendamento.html',
  styleUrl: './agendamento.css',
})
export class Agendamento {
  formAgendamento!: FormGroup;
  agendamentosList: AgendamentoModel[] = [];
  idSelecionado: number = 0;

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
  ) {}

  ngOnInit(): void {
    this.limparFormulario()
    this.agendamentosList = this.agendamentoService.getAll()
  }

  onSubmit(): void {
    if (this.formAgendamento.valid) {
      if (this.idSelecionado != 0) {
        this.agendamentoService.update(this.idSelecionado, this.formAgendamento.value);
        this.idSelecionado = 0;
      } else {
        this.agendamentoService.create(this.formAgendamento.value);
      }


      this.limparFormulario();

      this.agendamentosList = this.agendamentoService.getAll()
    }
  }

  selecionarId(id:number):void {
    this.idSelecionado = id
    this.carregarFormulario()
  }
  
  onExcluir(): void{
    console.log('ID',this.idSelecionado)
    this.agendamentoService.delete(this.idSelecionado)
    this.agendamentosList = this.agendamentoService.getAll()
    this.limparFormulario();
  } 

  limparFormulario(): void {
    this.formAgendamento = this.fb.group({
      nome: ['', Validators.required],
      veiculo: ['', Validators.required],
      servico: ['', Validators.required],
      horario: ['', Validators.required],
      profissional: ['', Validators.required],
      status: ['Pendente', Validators.required],
    });
  }

  carregarFormulario(): void {
    const agendamento = this.agendamentoService.getById(this.idSelecionado)

    this.formAgendamento = this.fb.group({
      nome: [agendamento?.nome, Validators.required],
      veiculo: [agendamento?.veiculo, Validators.required],
      servico: [agendamento?.servico, Validators.required],
      horario: [agendamento?.horario, Validators.required],
      profissional: [agendamento?.profissional, Validators.required],
      status: [agendamento?.status, Validators.required],
    });
  }
}
