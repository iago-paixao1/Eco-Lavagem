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

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
  ) {}

  ngOnInit(): void {
    this.formAgendamento = this.fb.group({
      nome: ['', Validators.required],
      veiculo: ['', Validators.required],
      servico: ['', Validators.required],
      horario: ['', Validators.required],
      profissional: ['', Validators.required],
      status: ['Pendente', Validators.required],
    });

    this.agendamentosList = this.agendamentoService.getAll()
  }

  onSubmit(): void {
    if (this.formAgendamento.valid) {
      this.agendamentoService.create(this.formAgendamento.value);

      this.formAgendamento.reset({
        status: 'Pendente',
      });

      console.log('Agendamento criado!');
      this.agendamentosList = this.agendamentoService.getAll()
    }
  }
}
