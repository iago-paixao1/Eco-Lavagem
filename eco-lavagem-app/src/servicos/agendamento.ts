import { Injectable } from '@angular/core';
import { StorageService } from './storage';

export interface AgendamentoModel {
  id: number;
  nome: string;
  veiculo: string;  
  servico: string;
  horario: string;
  profissional: string;
  status: 'Pendente' | 'Em andamento' | 'Concluido';
}

@Injectable({
  providedIn: 'root',
})

export class AgendamentoService {
  private storageKey = 'agendamentos';

  constructor(private storage:StorageService) {
    this.init();
  }

  // Inicializa com dados mock se não existir nada
  private init(): void {
    const data = this.storage.getItem(this.storageKey);
    if (!data) {
      const mock: AgendamentoModel[] = [
        {
          id: 1,
          nome: 'João Silva',
          veiculo: 'Honda Civic',
          servico: 'Lavagem Completa',
          horario: '08:00',
          profissional: 'Carlos',
          status: 'Concluido',
        },
      ];
      this.storage.setItem(this.storageKey, JSON.stringify(mock));
    }
  }

  // GET ALL
  getAll(): AgendamentoModel[] {
    return JSON.parse(this.storage.getItem(this.storageKey) || '[]');
  }

  // GET BY ID
  getById(id: number): AgendamentoModel | undefined {
    return this.getAll().find(a => a.id === id);
  }

  // CREATE
  create(agendamento: Omit<AgendamentoModel, 'id'>): AgendamentoModel {
    const lista = this.getAll();
    const novo: AgendamentoModel = {
      ...agendamento,
      id: new Date().getTime(), // gera id único simples
    };

    lista.push(novo);
    this.save(lista);

    return novo;
  }

  // UPDATE
  update(id: number, agendamento: Partial<AgendamentoModel>): AgendamentoModel | null {
    const lista = this.getAll();
    const index = lista.findIndex(a => a.id === id);

    if (index === -1) return null;

    lista[index] = { ...lista[index], ...agendamento };
    this.save(lista);

    return lista[index];
  }

  // DELETE
  delete(id: number): boolean {
    const lista = this.getAll();
    const novaLista = lista.filter(a => a.id !== id);

    this.save(novaLista);
    return true;
  }

  // SAVE
  private save(lista: AgendamentoModel[]): void {
    this.storage.setItem(this.storageKey, JSON.stringify(lista));
  }
}