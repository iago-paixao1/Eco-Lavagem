import { Injectable } from '@angular/core';
import { StorageService } from './storage';

export interface PServicosModel {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  tempo: string;
}

@Injectable({
  providedIn: 'root',
})
export class PServicoservice {
  private storageKey = 'servicos';

  constructor(private storage: StorageService) {
    this.init();
  }

  //Inicializa com dados mock
  private init(): void {
    const data = this.storage.getItem(this.storageKey);
    if (!data) {
      const mock: PServicosModel[] = [
        {
          id: 1,
          nome: 'Lavagem Externa Simples',
          descricao: 'Remocao de sujeira superficial',
          preco: '80',
          tempo: '30',
        },
      ];
      this.storage.setItem(this.storageKey, JSON.stringify(mock));
    }
  }
  // GET ALL
  getAll(): PServicosModel[] {
    return JSON.parse(this.storage.getItem(this.storageKey) || '[]');
  }
  // GET BY ID
  getById(id: number): PServicosModel | undefined {
    return this.getAll().find((c) => c.id === id);
  }

  // CREATE
  create(cliente: Omit<PServicosModel, 'id'>): PServicosModel {
    const lista = this.getAll();

    const novo: PServicosModel = {
      ...cliente,
      id: new Date().getTime(),
    };

    lista.push(novo);
    this.save(lista);

    return novo;
  }

  //UPDATE
  update(id: number, cliente: Partial<PServicosModel>): PServicosModel | null {
    const lista = this.getAll();
    const index = lista.findIndex((c) => c.id === id);

    if (index === -1) return null;
    lista[index] = { ...lista[index], ...cliente };
    this.save(lista);

    return lista[index];
  }
  //SAVE
  private save(lista: PServicosModel[]): void {
    this.storage.setItem(this.storageKey, JSON.stringify(lista));
  }

  //DELETE
  delete(id: number): boolean {
    const lista = this.getAll();
    const novaLista = lista.filter((c) => c.id !== id);

    this.save(novaLista);
    return true;
  }
}
