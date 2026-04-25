import { Injectable } from '@angular/core';
import { StorageService } from './storage';

export interface ProfissionalModel {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone:string;
  sexo: 'Masculino' | 'Feminino' | 'Outros';
}

@Injectable({
  providedIn: 'root',
})
export class ProfissionalService {
  private storageKey = 'profissional';

  constructor(private storage: StorageService) {
    this.init();
  }

  // Inicializa com dados mock
  private init(): void {
    const data = this.storage.getItem(this.storageKey);
    if (!data) {
      const mock: ProfissionalModel[] = [
        {
          id: 1,
          nome: 'João Silva',
          cpf: '123.456.789-00',
          email: 'joao@email.com',
          telefone: '47 984738545',
          sexo: 'Masculino'
        },
      ];
      this.storage.setItem(this.storageKey, JSON.stringify(mock));
    }
  }

  // GET ALL
  getAll(): ProfissionalModel[] {
    return JSON.parse(this.storage.getItem(this.storageKey) || '[]');
  }

  // GET BY ID
  getById(id: number): ProfissionalModel | undefined {
    return this.getAll().find(c => c.id === id);
  }

  // CREATE
  create(cliente: Omit<ProfissionalModel, 'id'>): ProfissionalModel {
    const lista = this.getAll();

    const novo: ProfissionalModel = {
      ...cliente,
      id: new Date().getTime(),
    };

    lista.push(novo);
    this.save(lista);

    return novo;
  }

  // UPDATE
  update(id: number, cliente: Partial<ProfissionalModel>): ProfissionalModel | null {
    const lista = this.getAll();
    const index = lista.findIndex(c => c.id === id);

    if (index === -1) return null;

    lista[index] = { ...lista[index], ...cliente };
    this.save(lista);

    return lista[index];
  }

  // DELETE
  delete(id: number): boolean {
    const lista = this.getAll();
    const novaLista = lista.filter(c => c.id !== id);

    this.save(novaLista);
    return true;
  }

  // SAVE
  private save(lista: ProfissionalModel[]): void {
    this.storage.setItem(this.storageKey, JSON.stringify(lista));
  }
}